const fs = require('fs');
const util = require('util');
const webpush = require('web-push');

const writeFilePromise = util.promisify(fs.writeFile);

const vapidkeys = webpush.generateVAPIDKeys();
writeFilePromise('./vapid.json', JSON.stringify(vapidkeys))
  .then(() => console.log('done'))
  .catch(err => console.error(err));
