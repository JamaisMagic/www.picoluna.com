const webPush = require('web-push');
const logger = require('../../../logger');
const childProcess = require('child_process');


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
  const ua = ctx.request.get('User-Agent') || '';

  if (!subscription || !subscription.endpoint) {
    return ctx.res.fail({});
  }

  const result = await ctx.app.dalMysql.webPUsh.storeTouristSubscription(
    subscription.endpoint, JSON.stringify(subscription), ua);

  if (result) {
    return ctx.res.success({});
  }

  return ctx.res.fail({});
};

exports.sendNotification = async ctx => {
  let body = ctx.request.body || {};
  const payload = JSON.stringify(body.payload);
  const endpoint = body.endpoint || '';

  const options = {
    TTL: body.ttl || 300,
  };




  const cp = childProcess.spawn('node', [
    `${process.cwd()}/app/scripts/tasks/webpush/sendNotification.js`,
    '--payload', payload,
    '--NODE_ENV', process.env.NODE_ENV,
    '--endpoint', endpoint,
  ], {
    env: process.env
  });
  cp.stdout.on('data', data => {
    logger.info(`Child process stdout:${data}`);
  });
  cp.stderr.on('data', data => {
    logger.info(`Child process stderr:${data}`);
  });
  cp.on('close', code => {
    logger.info(`Child process closed: ${code}`);
  });

  return ctx.res.success({});




  const rows = await ctx.app.dalMysql.webPUsh.querySubscriptionByEndpoint(endpoint);

  if (!rows || rows.length <= 0) {
    return ctx.res.fail({
      message: 'No such endpoint'
    });
  }

  const subscription = rows[0].subscription;

  try {
    const result = await webPush.sendNotification(subscription, payload, options);
    logger.info({event: 'sendNotificationInfo'}, JSON.stringify(result))
  } catch (err) {
    logger.error({
      event: 'sendNotificationError',
      err,
      payload,
      subscription: JSON.stringify(subscription)
    });
    return ctx.res.fail({
      message: 'Send notification failed'
    });
  }

  ctx.res.success({});
};
