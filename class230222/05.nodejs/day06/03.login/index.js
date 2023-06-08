const express = require("express");
const userRouter = require("./router/user");
require("./db"); // 连接数据库
const app = express();

app.use(express.static("public"));

app.use(userRouter);

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
