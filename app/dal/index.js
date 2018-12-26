const WebPush = require('./webPush');


module.exports.init = function (mysqlConn) {
  return {
    webPUsh: new WebPush(mysqlConn),
  };
};
