const connection = require('../app/database');

class CommentService {
  async DescribeCommentList(commentId) {
    const statement = `select * from comment where moment_id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  async CreateComment() {
    
  }
}

module.exports = new CommentService();