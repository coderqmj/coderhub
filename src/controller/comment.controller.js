const { DescribeCommentList } = require('../service/comment.service');
class CommentController {
  async list(ctx, next) {
    const result = await DescribeCommentList();
    console.log('result', result)
    ctx.body = {
      status: 200,
      commentSet: result,
    }
  }

  async create(ctx, next) {
    const { monentId, content } = ctx.request.body;
    const { id, name } = ctx.user;
    ctx.body = {
      user: ctx.user,
      message: "发表动态成功~"
    }
  }
}

module.exports = new CommentController();