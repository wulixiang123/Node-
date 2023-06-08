const express = require("express");
const cors = require("cors");
// 用来连接数据库
require("./db");
// 引入路由器
const usersRouter = require("./routers/users");

const app = express();

// 使用cors解决跨域
app.use(cors());
// 解析json格式请求体数据
app.use(express.json());

// 使用路由器: 路由器绑定的所有路由或中间件都会在app上生效
app.use(usersRouter);

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功了");
});
