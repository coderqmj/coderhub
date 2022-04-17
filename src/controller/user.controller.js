const service = require('../service/user.service');
class UerController {
  async create(ctx, next) {
    // 获取用户传入的字段

    // 数据查询

    // 数据返回
    const result = await service.create(ctx.request.body);

    // ctx.body = "创建成功~"
    ctx.body = result;
  }
}

module.exports = new UerController();