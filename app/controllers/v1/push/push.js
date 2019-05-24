const childProcess = require('child_process');
const logger = require('../../../logger');
const config = require('../../../config/index');


exports.getVapid = async ctx => {
  const data = {
    publicKey: config.sensitive.vapid.publicKey,
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
