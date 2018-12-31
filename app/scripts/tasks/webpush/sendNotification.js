const webPush = require('web-push');
const yargs  = require('yargs');
const mysql = require('mysql2/promise');


const {argv} = yargs
  .alias('a', 'all')
  .alias('E', 'endpoint')
  .alias('p', 'payload')
  .alias('e', 'NODE_ENV');

webPush.setVapidDetails(
  'https://www.picoluna.com/',
  'BC8OkdboFO_cuonafMmGUDZLwIQaUqG3XJrGoaajniesg_wJTidw0ttPGenM1S-S26IgHvJ5Vpr--AWWsZ_K-6M',
  'VoW_aeb33HLVSUAR6VDqo_U6WxlhT5l8keo6EnsWcl0'
);

const settings = {
  base: {
    host: 'www_mysql_5',
    port: 3306,
    database: 'www_picoluna_com',
    user: 'root',
    password: '123456',
    charset: 'UTF8MB4_GENERAL_CI'
  },
  development: {

  },
  production: {

  }
};

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
U.endpoint in (${new Array(length).fill('?').join(',')})
limit 5000;`;
}

function sqlSelectAll() {
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
limit 5000;`;
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

async function sendSpecification(payload, endpoint, ttl, NODE_ENV) {
  const setting = {...settings.base, ...settings[NODE_ENV]};
  const connection = await mysql.createConnection(setting);
  const sql = sqlSelectByEndpoint(endpoint.length);
  let [result, fields] = [null, null];

  try {
    [result, fields] = await connection.execute(sql, endpoint);
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }

  console.log(result);

  if (!result || result.length <= 0) {
    return console.log('No result');
  }

  let queue = new Queue({
    gap: 1000,
    tasks: result.map(item => {
      return async () => {
        const subscription = item.subscription;
        console.log(subscription);

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
}

function checkJson(val) {
  try {
    let o = JSON.parse(val);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (err) {
    return '';
  }
}

async function sendAll(payload, ttl, NODE_ENV) {
  const setting = {...settings.base, ...settings[NODE_ENV]};
  const connection = await mysql.createConnection(setting);
  const sql = sqlSelectAll();
  let [result, fields] = [null, null];

  try {
    [result, fields] = await connection.execute(sql, []);
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }

  console.log(result);

  if (!result || result.length <= 0) {
    return console.log('No result');
  }

  let queue = new Queue({
    gap: 1000,
    tasks: result.map(item => {
      return async () => {
        const subscription = item.subscription;
        console.log(subscription);

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

}

async function main() {
  console.log(argv);
  let all = argv.all;
  let payload = argv.payload;
  let endpoint = argv.endpoint;
  let ttl = Number.parseInt(argv.ttl) || 3600 * 2;
  let NODE_ENV = argv.NODE_ENV || 'development';

  if (!payload || !checkJson(payload)) {
    throw new Error('payload must be a json string with specify keys');
  }

  if (all) {
    await sendAll(payload, ttl, NODE_ENV);
    return;
  }

  if (!Array.isArray(endpoint)) {
    endpoint = [endpoint];
  }

  if (endpoint.every(item => !item)) {
    throw new Error('endpoint is required');
  }

  await sendSpecification(payload, endpoint, ttl, NODE_ENV);
}

if (require.main === module) {
  console.log('called directly');
  main();
}
