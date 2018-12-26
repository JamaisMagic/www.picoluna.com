const config = require('./config');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middlewares/errorHandler');
const logMiddleware = require('./middlewares/log');
const logger = require('./logger');
const requestId = require('./middlewares/requestId');
const responseHandler = require('./middlewares/responseHandler');
const rendererNunjucks = require('./middlewares/rendererNunjucks');
const router = require('./routes');
const redisModule = require('./common/connection/redis');
const mysqlModule = require('./common/connection/mysql');


const app = new Koa();
redisModule.connect().then(redis => app.redis = redis);
mysqlModule.connect(app).then(mysql => {});

// Trust proxy
app.proxy = true;

// Set middlewares
app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb'
  })
);
app.use(requestId());
app.use(responseHandler());
app.use(errorHandler());
app.use(logMiddleware({logger}));
app.use(rendererNunjucks());

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

function onError(err, ctx) {
  if (ctx == null) {
    logger.error({err, event: 'error'}, 'Unhandled exception occured');
  }
}

// Handle uncaught errors
app.on('error', onError);

// Start server
if (!module.parent) {
  const index = app.listen(config.port, config.host, () => {
    logger.info({event: 'execute'}, `API server listening on ${config.host}:${config.port}, in ${config.env}`);
  });
  index.on('error', onError);

  process.on('SIGTERM', async () => {
    logger.info('SIGTERM');
    index.close(async (error) => {
      logger.info('server closed');
      let mysqlStatus = await mysqlModule.end(app);
      let redisStatus = await redisModule.quit();
      logger.info('mysqlStatus', mysqlStatus);
      logger.info('redisStatus', redisStatus);
      setImmediate(() => {
        process.exit(0);
      });
    });
  });
}

// Expose app
module.exports = app;
