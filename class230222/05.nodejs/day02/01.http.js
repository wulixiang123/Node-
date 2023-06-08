const http = require("http");

/*
             发送请求
  浏览器 ---------------> 服务器

                            处理请求

  浏览器 <--------------- 服务器
            返回响应
*/
const server = http.createServer((request, response) => {
  /*
    函数就是处理请求的回调函数
      request  请求对象：包含所有浏览器发送给服务器的数据
      response 响应对象：包含将来服务器要响应给浏览器的所有数据
  */
  // response.setHeader("content-type", "text/plain;charset=utf-8"); // 解决中文乱码
  response.setHeader("content-type", "text/html;charset=utf-8"); // 解决中文乱码
  response.end(`<h1>hello</h1>`);
});

/* 
  1 - 65535 个端口号 
  4位数以下的端口号不建议使用（1-999）

  常用的端口号：
    3000 3001 3030 ...
    4000 4001 4040 ...
    5000 5001 5050 ...
    8000 8001 8080 ...
*/
server.listen(3000, (err) => {
  if (err) {
    console.log("服务器启动失败", err);
    return;
  }
  // 访问自己的服务器：http://127.0.0.1:3000  http://localhost:3000
  // 访问别人服务器：http://192.168.33.38:3000 (在cmd输入ipconfig可以查询自己的ip地址)
  console.log("服务器启动成功了", "http://127.0.0.1:3000");
});
