const app = require('./app');
const {APP_PORT} = require('./app/config');
require('./app/database')

app.listen(APP_PORT, () => {
  console.log(`服务器在${APP_PORT}启动监听成功~`);
})