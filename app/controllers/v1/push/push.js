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
  const body = ctx.request.body || {};
  const subscription = body.subscription;
  const ua = ctx.req.headers['User-Agent'] || '';

  if (!subscription || !subscription.endpoint) {
    return ctx.res.fail({});
  }

  const result = await ctx.app.dalMysql.webPUsh.storeSubscription(
    subscription.endpoint, JSON.stringify(subscription), ua, ''
  );

  return ctx.res.success({});
};

exports.sendNotification = async ctx => {
  let body = ctx.request.body || {};
  const payload = body.payload;
  const endpoint = body.endpoint || '';

  const options = {
    TTL: body.ttl || 300,
  };

  const rows = await ctx.app.dalMysql.webPUsh.querySubscriptionByEndpoint(endpoint);
  const subscription = rows[0].subscription;

  try {
    await webPush.sendNotification(subscription, payload, options);
  } catch (e) {
    logger.error(e);
  }

  ctx.res.success({});
};
