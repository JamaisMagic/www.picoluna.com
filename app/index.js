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


const app = new Koa();
redisModule.connectRedis().then(redis => app.redis = redis);

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
app.use(rendererNunjucks());
app.use(logMiddleware({ logger }));

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

function onError(err, ctx) {
    if (ctx == null) {
      logger.error({ err, event: 'error' }, 'Unhandled exception occured');
    }
}

// Handle uncaught errors
app.on('error', onError);

// Start server
if (!module.parent) {
    const index = app.listen(config.port, config.host, () => {
        logger.info({ event: 'execute' }, `API server listening on ${config.host}:${config.port}, in ${config.env}`);
    });
    index.on('error', onError);
}

// Expose app
module.exports = app;
