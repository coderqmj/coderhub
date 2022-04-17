const { create, DescribeMomentDetail, DescribeMoment, ModifyMoment, DeleteMoment } = require('../service/moment.service');
class MomentController {
  async create(ctx, next) {
    // 1.获取id和content
    const { id } = ctx.user;
    const { content } = ctx.request.body;
    // 2.把数据放入数据库
    const result = await create(id, content);
    ctx.body = {
      code: 200,
      message: "发表成功~"
    };
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await DescribeMomentDetail(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const result = await DescribeMoment();
    ctx.body = result;
  }

  async update(ctx, next) {
    const { content, id } = ctx.request.body;
    const result = await ModifyMoment(content, id);
    ctx.body = {
      status: 200,
      message: "修改成功",
      result,
    }
  }

  async remove(ctx, next) {
    const { id } = ctx.request.body;
    const result = await DeleteMoment(id);
    ctx.body = {
      status: 200,
      message: '删除成功~',
      result,
    };
  }
}

module.exports = new MomentController();