const express = require("express");
const fs = require("fs");
const app = express();

// 使用中间件：记录用户访问日志
app.use((req, res, next) => {
  /*  
    收集用户请求方式，请求地址，请求来源地址，访问时间
  */
  // console.log(req.method);
  // console.log(req.url);
  // console.log(req.headers['user-agent']);
  // console.log(req.headers['referer']);
  // console.log(Date.now());

  const log = `${req.method} ${req.url} ${req.headers["user-agent"]} ${
    req.headers.referer
  } ${Date.now()}\n`;

  // 将日志写入文件
  fs.writeFileSync("./access.log", log, {
    // flag: "w", // 默认值：写入（覆盖）
    flag: "a", // 追加
  });

  next();
});

app.get("/", (req, res) => {
  res.end("hello");
});

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
