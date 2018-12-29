const webPush = require('web-push');
const yargs  = require('yargs');
const mysql = require('mysql2/promise');


const {argv} = yargs.alias('E', 'endpoint').alias('p', 'payload').alias('e', 'NODE_ENV');

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

function createSql(length) {
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


async function main() {
  console.log(argv);
  let endpoint = argv.endpoint;
  let payload = argv.payload;
  let ttl = argv.ttl;
  let NODE_ENV = argv.NODE_ENV;

  if (!endpoint) {
    throw new Error('endpoint is required');
  }

  if (!payload) {
    throw new Error('payload is required');
  }

  if (!Array.isArray(endpoint)) {
    endpoint = [endpoint];
  }

  if (Array.isArray(payload)) {
    payload = payload[0];
  }

  if (Array.isArray(ttl)) {
    ttl = ttl[0];
  }

  if (Array.isArray(NODE_ENV)) {
    NODE_ENV = NODE_ENV[0];
  }

  console.log(endpoint);

  const options = {
    TTL: ttl || ttl,
  };
  const setting = {...settings.base, ...settings[NODE_ENV]};
  const connection = await mysql.createConnection(setting);

  let sql = createSql(endpoint.length);

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
    gap: 5000,
    tasks: result.map(item => {
      return async () => {
        const subscription = item.subscription;
        console.log(subscription);

        try {
          const result = await webPush.sendNotification(JSON.parse(subscription), payload, options);
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

if (require.main === module) {
  console.log('called directly');
  main();
}
