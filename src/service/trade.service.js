const connection = require('../app/database');

class TradeService {
  async DescribeMoment() {
    const statement = `select * from bribe_open_token;`;
    const result = await connection.execute(statement);
    return result[0];
  }

};

module.exports = new TradeService();