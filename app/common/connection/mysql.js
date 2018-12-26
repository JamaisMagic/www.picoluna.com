const mysql = require('mysql2/promise');
const config = require('../../config/index');
const logger = require('../../logger');


async function connect(app) {
  const connection = await mysql.createConnection(config.mysql);
  logger.info('Mysql connected.');
  if (app) {
    app.mysql = connection;
  }

  connection.on('error', async (err) => {
    logger.error('mysql error event', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ER_HOST_IS_BLOCKED') {
      logger.info('mysql reconnecting');
      await connect(app);
    }
  });

  return 0;
}

function end(app) {
  if (app && app.mysql) {
    return app.mysql.end();
  }
  return Promise.resolve(1);
}

module.exports = {
  connect,
  end,
};
