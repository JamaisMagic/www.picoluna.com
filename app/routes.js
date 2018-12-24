const Router = require('koa-router');
const homeController = require('./controllers/home');
const pushController = require('./controllers/v1/push/push');


const router = new Router();
router.get('/api/v1/push/vapid/', pushController.getVapid);
router.post('/api/v1/push/subscription/', pushController.storeSubscription);
router.get('/api/', homeController.welcome);
router.get('/', homeController.welcome);

module.exports = router;
