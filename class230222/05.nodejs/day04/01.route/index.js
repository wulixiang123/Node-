// 1. 引入 express
const express = require("express");
// 2. 创建 app 应用对象
const app = express();

// 3. 搭建路由
/*
  路由特点：
    1. 一个路由只能处理相应url的请求（一对一关系）
*/
app.get("/", (req, res) => {
  // 返回响应
  res.end("hello");
});

/*
  相当于所有路由放入一个数组中，当前将来客户端发送请求时，遍历这个数组来处理请求
  一旦前面路由命中了，后面路由就不看了
  所有路由都没命中，就返回404
*/
app.get("/aaa", (req, res) => {
  // 返回响应
  res.end("hello aaa111");
});

// app.get("/aaa", (req, res) => {
//   // 返回响应
//   res.end("hello aaa222");
// });

// 一对多的关系
app.get("/post/:id", (req, res) => {
  console.log(req.params);
  // 返回响应
  res.end("hello id~~");
});

// 4. 监听端口号，启动服务器
app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败了", err);
  else console.log("服务器启动成功了");
});
