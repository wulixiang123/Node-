const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

/*
  配置路由

    一个路由对应一个请求url


    npm i nodemon -g
      node index.js启动代码，每次修改代码需要重启，麻烦
      nodemon index.js启动代码，监视代码文件的变化，一旦发生变化，会自动重启
*/
// http://localhost:3000
app.get("/", (request, response) => {
  /*
    request 请求对象：浏览器发送给服务器的内容（请求报文）
      request.query 获取查询字符串参数
      request.body 获取请求体参数（请求体参数默认express不解析了）
      request.headers 获取请求头
      request.params
      request.method 请求方式
      request.url 请求地址
        
    response 响应对象：服务器响应给浏览器的内容（响应报文）
      响应普通数据
        response.end(数据) 返回响应
        response.send(数据) 返回响应（自动根据响应的内容，设置相应的响应头）
        response.json(数据) 返回响应（返回json数据，自动将js对象数据转化json对象）
      响应文件
        response.sendFile(文件绝对路径) 返回文件响应，文件被浏览器打开
        response.download(文件绝对路径) 返回文件响应，文件被浏览器下载
      response.set(key, value) 设置响应头
      response.status(200) 设置响应状态码
  */
  // console.log("接受到了 / 请求", request.query); // { username: '123', password: '456' }
  // console.log(request.headers);
  // console.log(request.method);
  // console.log(request.url);

  // response.end("hello /");
  // fs.readFile("index.html", (err, file) => {
  //   if (err) {
  //     console.log("文件读取失败", err);
  //     return;
  //   }
  //   // response.end(file);
  //   response.send(file);
  // });
  // response.end(JSON.stringify({ name: "jack" }));
  // response.send({ name: "jack" });
  // response.json({ name: "jack" });

  // 生成绝对路径
  const filepath = path.resolve("index.html");
  console.log(filepath);
  // response.sendFile(filepath);

  response.download(filepath);
});

app.get("/a", () => {
  console.log("接受到了 /a 请求");
});

app.get("/b", () => {
  console.log("接受到了 /b 请求");
});

app.listen(3000, (err) => {
  if (err) {
    console.log("服务器启动失败了", err);
    return;
  }
  console.log("服务器启动成功了");
});
