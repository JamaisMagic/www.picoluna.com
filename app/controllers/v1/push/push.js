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

exports.subscribe = async ctx => {
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

exports.unsubscribe = async ctx => {
  const body = ctx.request.body || {};
  const subscription = body.subscription;

  if (!subscription || !subscription.endpoint) {
    return ctx.res.fail({});
  }

  const result = await ctx.app.dalMysql.webPUsh.removeSubscriptionByEndpoint(subscription.endpoint);

  if (result) {
    return ctx.res.success({});
  }

  ctx.res.fail({});
};

exports.sendNotification = async ctx => {
  const body = ctx.request.body || {};
  const all = body.all;
  const payload = JSON.stringify(body.payload);
  let endpoint = body.endpoint || '';

  if (!endpoint || endpoint.length <= 0) {
    return ctx.res.fail({
      message: 'endpoint is required'
    });
  }

  if (!Array.isArray(endpoint)) {
    endpoint = [endpoint];
  }

  const endpointArgvs = endpoint.reduce((a, c) => [...a, '--endpoint', c], []);
  const cp = childProcess.spawn('node', [
    `${process.cwd()}/app/scripts/tasks/webpush/sendNotification.js`,
    '--payload', payload,
    '--NODE_ENV', process.env.NODE_ENV,
    ...endpointArgvs,
    all === 1 ? '--all' : '',
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
};
