const webPush = require('web-push');
const yargs  = require('yargs');
const mysql = require('mysql2/promise');
const config = require('../../../config/index');
const Util = require('../../../utils/utils');

const nowDate = new Date();
const month = `${nowDate.getMonth() + 1 <= 9 ? '0' : ''}${nowDate.getMonth() + 1}`;
const date = `${nowDate.getDate() <= 9 ? '0' : ''}${nowDate.getDate()}`;
const nowDateStr = `${nowDate.getFullYear()}-${month}-${date}`;

let sendAllDataList = [];
let sendAllLastId = 0;
let sendAllCurrentTableIndex = 0x0;
let produceFinished = false;
let consumeFinished = false;


const {argv} = yargs
  .alias('a', 'all')
  .alias('E', 'endpoint')
  .alias('p', 'payload');

webPush.setVapidDetails(
  'https://www.picoluna.com/',
  config.sensitive.vapid.publicKey,
  config.sensitive.vapid.privateKey
);

function sqlSelectByEndpoint(length) {
  return `select * from ( select * from web_push_0 
union select * from web_push_1
union select * from web_push_2
union select * from web_push_3
union select * from web_push_4
union select * from web_push_5
union select * from web_push_6
union select * from web_push_7
union select * from web_push_8
union select * from web_push_9
union select * from web_push_a
union select * from web_push_b
union select * from web_push_c
union select * from web_push_d
union select * from web_push_e
union select * from web_push_f ) as U
where
U.endpoint in (${new Array(length).fill('?').join(',')}) and
U.ct < ?
order by U.id asc
limit 2000;`;
}

class Queue {
  constructor(options={}) {
    this.tasks = options.tasks || [];
    this.cucurrency = parseInt(options.cucurrency) || 1;
    this.gap = parseInt(options.gap) || 0;
  }

  add(fn) {
    this.tasks.push(fn);
  }

  async run() {
    if (this.tasks.length <= 0) {
      return;
    }

    let fnArr = this.tasks.splice(0, this.cucurrency);
    await Promise.all(fnArr.map(fnItem => {
      return new Promise(async (resolve) => {
        await fnItem();
        resolve();
      });
    }));

    if (this.tasks.length > 0) {
      if (this.gap > 0) {
        await new Promise(resolve => setTimeout(resolve, this.gap));
      }
      await this.run();
    }
  }
}

async function sendSpecification(payload, endpoint, ttl) {
  const connection = await mysql.createConnection(config.mysql);
  const sql = sqlSelectByEndpoint(endpoint.length);
  let [result, fields] = [null, null];

  try {
    [result, fields] = await connection.execute(sql, [...endpoint, nowDateStr]);
  } catch (err) {
    console.log(err);
  }

  if (!result || result.length <= 0) {
    connection.end();
    return console.log('No result');
  }

  let queue = new Queue({
    gap: 1000,
    tasks: result.map(item => {
      return async () => {
        const subscription = item.subscription;

        try {
          const result = await webPush.sendNotification(JSON.parse(subscription), payload, {
            TTL: ttl,
          });
          console.log('Send end: ', result.statusCode, result.headers.location);
        } catch (err) {
          console.error('Send err: ', err.statusCode, err.message, err.endpoint);
          // 410
        }
      }
    })
  });

  await queue.run();
  connection.end();
}

async function sendAll(payload, ttl) {
  const connection = await mysql.createConnection(config.mysql);

  let sendAllTaskQueue = new Queue({
    gap: 1000
  });

  async function *producer() {
    while (true) {
      const [result, fields] = await connection.execute(`select id, subscription, ct 
      from web_push_${sendAllCurrentTableIndex.toString(16)} 
      where id > ?
      and ct < ?
      order by id asc limit 2000`, [sendAllLastId, nowDateStr]);

      sendAllLastId = (result[result.length - 1] || {}).id || 0;
      sendAllDataList = [...sendAllDataList, ...result];
      if (result.length <= 0) {
        sendAllCurrentTableIndex = sendAllCurrentTableIndex + 0x1;
        console.log('table switch: ', sendAllCurrentTableIndex.toString(16));
      }
      if (sendAllCurrentTableIndex > 0xf) {
        produceFinished = true;
        console.log('produce finished');
      }
      yield consumer;
    }
  }

  async function *consumer() {
    while (true) {
      if (sendAllDataList.length > 0) {
        let items = sendAllDataList.splice(0, 1000);
        items.forEach(item => {
          sendAllTaskQueue.add(async () => {
            const subscription = item.subscription;

            try {
              console.log('send notification: ' + JSON.stringify(subscription) + ' : ' + payload);
              const result = await webPush.sendNotification(subscription, payload, {
                TTL: ttl,
              });
              console.log('Send end: ', result.statusCode, result.headers.location);
            } catch (err) {
              console.error('Send err: ', err.statusCode, err.message, err.endpoint);
              // 410
              if (err.statusCode === 410) {
                await connection.execute(`delete from web_push_${Util.md5(err.endpoint).toLowerCase()[0]} where id = ?`, [item.id]);
              }
            }
          });
        });
        await sendAllTaskQueue.run();
      } else if (produceFinished === true) {
        consumeFinished = true;
        console.log('consume finish');
      }
      yield producer;
    }
  }

  let proSumMap = new WeakMap();
  proSumMap.set(consumer, consumer());
  proSumMap.set(producer, producer());

  let currentRun = producer;

  do {
    currentRun = (await proSumMap.get(currentRun).next()).value;
  } while(produceFinished === false || consumeFinished === false);

  await connection.end();
}

async function main() {
  console.log(argv);
  let all = argv.all;
  let payload = argv.payload;
  let endpoint = argv.endpoint;
  let ttl = Number.parseInt(argv.ttl) || 3600 * 2;

  if (!payload || !Util.isJson(payload)) {
    throw new Error('payload must be a json string with specify keys');
  }

  if (all) {
    await sendAll(payload, ttl);
    return;
  }

  if (!Array.isArray(endpoint)) {
    endpoint = [endpoint];
  }

  if (endpoint.every(item => !item)) {
    throw new Error('endpoint is required');
  }

  await sendSpecification(payload, endpoint, ttl);
}

if (require.main === module) {
  console.log('called directly');
  main();
}
