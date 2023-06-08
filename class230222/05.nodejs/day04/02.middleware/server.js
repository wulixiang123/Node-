const express = require("express");

const app = express();

/*
  express提供内置中间件函数
    express.static 静态资源中间件函数
    （作用：用来将某个目录的所有内容向外暴露，客户端可以通过服务器访问该目录下的所有资源）
    express.urlencoded 解析请求体参数中间件函数
      只能解析form表单提交（application/x-www-form-urlencoded）的请求体参数
    express.json 解析请求体参数中间件函数
      只能解析json格式（application/json）请求体参数
*/
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
  // console.log(req.query); // { username: 'admin' }
  // undefined 默认情况下，express不解析请求体参数 
  // { username: 'admin' }
  console.log(req.body); 
  res.end("end");
});

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败了", err);
  else console.log("服务器启动成功了");
});
