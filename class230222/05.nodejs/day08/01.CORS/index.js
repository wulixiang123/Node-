const express = require("express");
// pnpm add cors
const cors = require("cors");
const app = express();

// app.use(cors());

app.use((req, res, next) => {
  /*
    1. 如果普通 get 和 post 请求，只要设置
      res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    2. 如果其他请求方式
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    3. 如果有特殊请求头
      res.setHeader("Access-Control-Allow-Headers", "token");
    4. 用来缓存预检请求
      res.setHeader("Access-Control-Max-Age", 1000 * 3600 * 24);

    一旦是其他请求方式或有特殊请求头，浏览器会发送两个请求：
      1. 预检请求（OPTIONS）：检查该请求是否可以跨域，如果可以发送第二个请求
      2. 用户发送请求
    
    什么样的请求会有预检请求：
      1. PUT DELETE
      2. 特殊请求头 token
  */

  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "token");
  res.setHeader("Access-Control-Max-Age", 1000 * 3600 * 24);

  // 预检请求，直接return
  if (req.method === "options") {
    res.end();
    return;
  }

  // 触发下一个路由或中间件
  next();
});

app.get("/testCORS", (req, res) => {
  // 设置响应头
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");

  res.json({
    code: 200,
    message: null,
    success: true,
    data: "GET /testCORS 请求成功",
  });
});

app.post("/testCORS", (req, res) => {
  // 设置响应头
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");

  res.json({
    code: 200,
    message: null,
    success: true,
    data: "POST /testCORS 请求成功",
  });
});

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
