const Router = require('koa-router');
const homeController = require('./controllers/home');
const pushController = require('./controllers/v1/push/push');


const router = new Router();
router.get('/api/v1/web_push/vapid/', pushController.getVapid);
router.post('/api/v1/web_push/subscription/', pushController.subscribe);
router.del('/api/v1/web_push/subscription/', pushController.unsubscribe);
router.post('/api/v1/web_push/send/', pushController.sendNotification);
router.get('/api/', homeController.welcome);
router.get('/', homeController.welcome);

module.exports = router;
