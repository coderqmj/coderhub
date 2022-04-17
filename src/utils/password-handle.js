const crypto = require("crypto");

const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  // hex表示16进制的结果，不然就是buffer
  const result = md5.update(password).digest('hex');
  return result
}

module.exports = md5password;