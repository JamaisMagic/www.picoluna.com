const path = require('path');
const { env, name } = require('./');


const directory = process.env.LOG_DIRECTORY || path.resolve('/data/log/www.picoluna.com');
const filename = process.env.LOG_FILENAME || `${name}.${env}.json.log`;
const outFile = path.resolve('/data/log/www.picoluna.com/out.json.log');
const errFile = path.resolve('/data/log/www.picoluna.com/error.json.log');

const config = {
  name,
  streams: []
};

// Add streams as depending on the environment
if (env === 'production') {
  config.streams.push({
    type: 'file',
    path: outFile,
    level: 'info'
  });
  config.streams.push({
    type: 'file',
    path: errFile,
    level: 'error'
  });
} else if (env === 'development') {
  config.streams.push({
    type: 'stream',
    stream: process.stdout,
    level: 'debug'
  });
}

module.exports = config;
