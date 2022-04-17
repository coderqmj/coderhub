const errorTypes = require('../constant/error-types')
const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空~";
      break;
    case errorTypes.NAME_ALRADY_EXIST:
      status = 409;
      message = "用户名已经存在";
      break;
    case errorTypes.USER_NOT_EXIST:
      status = 404;
      message = "用户名不存在";
      break;
    case errorTypes.PASSWORD_ERROR:
      status = 404;
      message = "密码错误";
      break;  
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "未授权~";
      break;
    case errorTypes.NO_PERMISSION:
      status = 401;
      message = "您没有权限进行此项操作~";
      break;
    default:
      tatus = 404; // Bad Request
      message = "NOT FOUND";
  }
  ctx.status = status;
  ctx.body = {
    user: ctx?.user?.name || '',
    status,
    message,
  };
};

module.exports = errorHandler;