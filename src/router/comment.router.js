const Router = require('koa-router');
const { list, create } = require('../controller/comment.controller');
const { verifyAuth } = require('../middleware/auth.middleware');


const commentRouter = new Router({ prefix: '/comment' });

commentRouter.get('/', list);
commentRouter.post('/', verifyAuth, create);

module.exports = commentRouter;