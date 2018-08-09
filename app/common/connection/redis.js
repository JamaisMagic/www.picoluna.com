const Redis = require('ioredis');
const config = require('../../config/index');
const logger = require('../../logger');

let connRedis = null;

function connect() {
  connRedis = new Redis(config.redis);

  connRedis.on('connect', () => {
    logger.info({event: 'redis.connect'});
  });
  connRedis.on('error', () => {
    logger.info({event: 'redis.error'});
  });
  connRedis.on('close', () => {
    logger.info({event: 'redis.close'});
  });
  connRedis.on('reconnecting', () => {
    logger.info({event: 'redis.reconnecting'});
  });
  connRedis.on('end', () => {
    logger.info({event: 'redis.end'});
  });

  return new Promise((resolve) => {
    connRedis.on('ready', () => {
      logger.info({event: 'redis.ready'});
      resolve(connRedis);
    });
  });
}

module.exports.connectRedis = connect;
