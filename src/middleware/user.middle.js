const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_ALRADY_EXIST } = require('../constant/error-types');
const { isExist } = require('../service/user.service');
const { md5password } = require('../utils')
const verifyUser = async (ctx, next) => {
  // 1.获取用户名
  const { name, password } = ctx.request.body;
  // // 2.判断用户名密码不为空
  if (!name || !password || name === '' || password === '') {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);

    return ctx.app.emit('error', error, ctx);
  }
  // 3.本次注册的数据是否已经存在
  const exist = !!(await isExist(ctx.request.body)).length;
  if (exist) {
    const error = new Error(NAME_ALRADY_EXIST);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}

module.exports = {
  verifyUser,
  handlePassword
}