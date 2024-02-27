const Router = require('koa-router');
const { list } = require('../controller/trade.controller');
// const { verifyAuth } = require('../middleware/auth.middleware');


const tardeRouter = new Router({ prefix: '/trade' });

tardeRouter.get('/', list);
// commentRouter.post('/', verifyAuth, create);

module.exports = tardeRouter;