const connection = require('../app/database');

class UserService {
  async create(user) {
    const { name, password } = user;
    // 存到数据库里面
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [name, password]);
    return result[0];
  }

  async isExist(user) {
    const { name } = user;
    const statement = `select * from users where name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new UserService();