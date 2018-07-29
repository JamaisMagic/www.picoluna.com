const dotenv = require('dotenv');


dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'www.picoluna.com',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 8000
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
