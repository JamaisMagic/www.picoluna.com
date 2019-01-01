const crypto = require('crypto');

class Utils {
  static md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }

  static isJson(val) {
    try {
      let o = JSON.parse(val);
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (err) {
      return '';
    }
  }
}

module.exports = Utils;
