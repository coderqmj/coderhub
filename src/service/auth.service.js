const connection = require('../app/database');
class AuthSetvice {
  async checkMoment(id, userId) {
    const statement = `select * from moment where id = ? and user_id = ?;`;
    const [result] = await connection.execute(statement, [id, userId]);
    return result.length > 0;
  }
}

module.exports = new AuthSetvice();