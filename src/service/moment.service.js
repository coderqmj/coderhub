const connection = require('../app/database');

class MomentService {
  async create(id, content) {
    const statement = `insert into moment (content, user_id) values(?, ?)`;
    const result = await connection.execute(statement, [content, id]);
    return result;
  }
  async DescribeMomentDetail(id) {
    const statement = `select 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) author 
      from moment m 
      left join users u on m.user_id = u.id 
      where m.id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0][0];
  }

  async DescribeMoment() {
    const statement = `select 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) author 
      from moment m 
      left join users u on m.user_id = u.id;`;

    const result = await connection.execute(statement);
    return result[0];
  }

  async ModifyMoment(content, id) {
    const statement = `update moment set content = ? where id = ?`;
    const result = await connection.execute(statement, [content, id]);
    return result[0];
  }

  async DeleteMoment(id) {
    const statement = `delete from moment where id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

};

module.exports = new MomentService();