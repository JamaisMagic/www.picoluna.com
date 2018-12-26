const Redis = require('ioredis');
const config = require('../../config/index');
const logger = require('../../logger');

let connection = null;

function connect() {
  connection = new Redis(config.redis);

  connection.on('connect', () => {
    logger.info({event: 'redis.connect'});
  });
  connection.on('error', () => {
    logger.info({event: 'redis.error'});
  });
  connection.on('close', () => {
    logger.info({event: 'redis.close'});
  });
  connection.on('reconnecting', () => {
    logger.info({event: 'redis.reconnecting'});
  });
  connection.on('end', () => {
    logger.info({event: 'redis.end'});
  });

  return new Promise((resolve) => {
    connection.on('ready', () => {
      logger.info({event: 'redis.ready'});
      resolve(connection);
    });
  });
}

function quit() {
  if (connection) {
    return connection.quit();
  }
  return Promise.resolve(1);
}

module.exports = {
  connect,
  quit
};
