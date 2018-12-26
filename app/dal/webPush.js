const logger = require('../logger');
const Util = require('../utils/utils');

const TABLE_NAME_PREFIX_WEB_PUSH = 'web_push';



class WebPush {
  constructor(conn) {
    if (!conn) {
      logger.error('No conn.');
    }
    this.conn = conn;
  }

  static getTableIndex(val, tableBase) {
    const md5 = Util.md5(val).toLowerCase();
    return `${tableBase}_${md5[0]}`;
  }

  async storeTouristSubscription(endpoint, subscription, ua) {
    const tableName = WebPush.getTableIndex(endpoint, TABLE_NAME_PREFIX_WEB_PUSH);
    const [rows, fields] = await this.conn.execute(`insert into ${tableName} (endpoint, subscription, ua) 
    values (?, ?, ?) on duplicate key 
    update subscription = ?, ua = ?`, [endpoint, subscription, ua, subscription, ua]);

    logger.info(JSON.stringify(rows));
    logger.info(JSON.stringify(fields));
    return 1;
  }

  async storeUserSubscription(endpoint, subscription, ua, uid) {
    const tableName = WebPush.getTableIndex(endpoint, TABLE_NAME_PREFIX_WEB_PUSH);
    const [rows, fields] = await this.conn.execute(`insert into ${tableName} (endpoint, subscription, ua, uid) 
    values (?, ?, ? ,?) on duplicate key 
    update subscription = ?, ua = ?`, [endpoint, subscription, ua, uid, subscription, ua]);

    logger.info(rows);
    logger.info(fields);
    return 1;
  }

  async querySubscriptionByEndpoint(endpoint) {
    const tableName = WebPush.getTableIndex(endpoint, TABLE_NAME_PREFIX_WEB_PUSH);
    const [rows, fields] = await this.conn.execute(`select * from ${tableName} where \`endpoint\` = ?`, [endpoint]);
    logger.info(JSON.stringify(rows));
    logger.info(JSON.stringify(fields));
    return rows;
  }
}

module.exports = WebPush;
