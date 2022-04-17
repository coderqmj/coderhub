
const Router = require('koa-router');
const { create, detail, list, update, remove } = require('../controller/moment.controller');
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');

const momentRouter = new Router({ prefix: '/moment' });

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/:momentId', detail);
// 1.修改必须登录，且用户本人
momentRouter.patch('/', verifyAuth, verifyPermission, update);
momentRouter.get('/', list);
momentRouter.delete('/', verifyAuth, verifyPermission, remove);

module.exports = momentRouter;