const Router = require('koa-router');
const homeController = require('./controllers/home');


const router = new Router();
router.get('/api/', homeController.welcome);
router.get('/', homeController.welcome);

module.exports = router;
