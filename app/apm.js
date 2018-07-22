const apm = require('elastic-apm-node');


apm.start({
    active: process.env.NODE_ENV === 'production'
});

module.exports = apm;
