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

  async doExecute(sql, values) {
    try {
      const [result, fields] = await this.conn.execute(sql, values);
      if (result) {
        logger.info({event: 'mysqlExecuteInfo', msg: JSON.stringify(result)});
        return result;
      }
      logger.info({event: 'mysqlExecuteError', msg: 'No result', misc: {
          sql, values: JSON.stringify(values)
        }});
      return null;
    } catch (e) {
      logger.error({event: 'mysqlExecuteError', msg: e.message, misc: {
        sql, values: JSON.stringify(values)
      }});
      return null;
    }
  }

  async storeTouristSubscription(endpoint, subscription, ua) {
    const tableName = WebPush.getTableIndex(endpoint, TABLE_NAME_PREFIX_WEB_PUSH);

    return this.doExecute(`insert into ${tableName} (endpoint, subscription, ua) 
    values (?, ?, ?) on duplicate key 
    update subscription = ?, ua = ?`, [endpoint, subscription, ua, subscription, ua]);
  }

  async storeUserSubscription(endpoint, subscription, ua, uid) {
    const tableName = WebPush.getTableIndex(endpoint, TABLE_NAME_PREFIX_WEB_PUSH);

    return this.doExecute(`insert into ${tableName} (endpoint, subscription, ua, uid) 
    values (?, ?, ? ,?) on duplicate key 
    update subscription = ?, ua = ?`, [endpoint, subscription, ua, uid, subscription, ua]);
  }

  async querySubscriptionByEndpoint(endpoint) {
    const tableName = WebPush.getTableIndex(endpoint, TABLE_NAME_PREFIX_WEB_PUSH);

    return this.doExecute(`select * from ${tableName} where \`endpoint\` = ?`, [endpoint]);
  }
}

module.exports = WebPush;
