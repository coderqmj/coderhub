const { DescribeMoment } = require('../service/trade.service');
class TradeController {
  async list(ctx, next) {
    const result = await DescribeMoment();
    ctx.body = result.reverse();
  }
}

module.exports = new TradeController();