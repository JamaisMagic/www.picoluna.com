const fs = require('fs');
const path = require('path');
const util = require('util');
const webPush = require('web-push');
const logger = require('../../../logger');


webPush.setVapidDetails(
  'https://www.picoluna.com/',
  'BC8OkdboFO_cuonafMmGUDZLwIQaUqG3XJrGoaajniesg_wJTidw0ttPGenM1S-S26IgHvJ5Vpr--AWWsZ_K-6M',
  'VoW_aeb33HLVSUAR6VDqo_U6WxlhT5l8keo6EnsWcl0'
);

exports.getVapid = async ctx => {
  const data = {
    publicKey: 'BC8OkdboFO_cuonafMmGUDZLwIQaUqG3XJrGoaajniesg_wJTidw0ttPGenM1S-S26IgHvJ5Vpr--AWWsZ_K-6M',
  };

  return ctx.res.ok({
    data,
    message: 'Success'
  });
};

exports.storeSubscription = async ctx => {
  let body = ctx.request.body || {};
  let subscription = body.subscription;

  if (!subscription || !subscription.endpoint) {
    return ctx.res.fail({});
  }

  const writeFilePromise = util.promisify(fs.writeFile);

  try {
    await writeFilePromise(path.join(__dirname, 'subscription.txt'), JSON.stringify(subscription) + '\n', {
      flag: 'a'
    });
  } catch (e) {
    console.log(e);
    logger.error('write file', e);
  }

  return ctx.res.success({});
};

exports.sendNotification = async ctx => {
  let body = ctx.request.body || {};
  const payload = body.payload;
  const subscription = body.subscription || {};
  const endpoint = body.endpoint || '';

  const options = {
    TTL: body.ttl || 300,
  };

  try {
    await webPush.sendNotification(subscription, payload, options);
  } catch (e) {
    logger.error(e);
  }

  ctx.res.success({});
};
