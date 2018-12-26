const crypto = require('crypto');

class Utils {
  static md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }
}

module.exports = Utils;
