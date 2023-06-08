const express = require("express");
const app = express();

/*
  中间件：
    一种特殊的路由。
      传统路由是一对一或一对多关系
      而中间件能接受处理所有请求（一对多关系）
*/

app.use((req, res, next) => {
  console.log("111");
  // res.end("hello middleware111");
  next(); // 触发下一个路由(通常放最后)
});

app.get("/", (req, res, next) => {
  console.log("222");
  next();
});

app.use((req, res, next) => {
  console.log("333");
  // res.end("hello middleware222");
});

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
