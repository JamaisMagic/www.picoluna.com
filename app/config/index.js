const dotenv = require('dotenv');


dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'www.picoluna.com',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 8000,
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      db: 0
    }
  },
  production: {
    port: process.env.APP_PORT || 8000
  },
  development: {
  },
  test: {
    port: process.env.APP_PORT || 8000,
  }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
