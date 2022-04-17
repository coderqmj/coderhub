const jwt = require('jsonwebtoken');
const { NAME_OR_PASSWORD_IS_REQUIRED, USER_NOT_EXIST, PASSWORD_ERROR, NO_PERMISSION } = require('../constant/error-types');
const { PUBLIC_KEY } = require('../app/config')
const { isExist } = require('../service/user.service');
const { checkMoment } = require('../service/auth.service');
const { md5password } = require('../utils');
const { UNAUTHORIZATION } = require('../constant/error-types');
/**
 * 验证账号密码是否ok
 */
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 1.isEmpty
  if (!name || !password || name === '' || password === '') {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 2.用户是否存在
  const userInfo = await isExist(ctx.request.body);
  if (!userInfo.length) {
    const error = new Error(USER_NOT_EXIST);
    return ctx.app.emit('error', error, ctx);
  }
  // 3.判断账号密码是否正确
  if (userInfo[0].password !== md5password(password)) {
    const error = new Error(PASSWORD_ERROR);
    return ctx.app.emit('error', error, ctx);
  }
  ctx.user = userInfo[0];
  await next();
};

/**
 * 验证token
 */
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", '');
  try {
    // 会返回我们之前加密用到的信息，本项目是用户名和id
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}

/**
 * 验证操作权限
 */
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.request.body;
  const { id: loginId } = ctx.user;
  const isPermission = await checkMoment(id, loginId);
  if (!isPermission) {
    const error = new Error(NO_PERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};