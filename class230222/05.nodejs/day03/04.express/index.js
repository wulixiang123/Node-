// 1. 引入 express
const express = require("express");

// 2. 创建 app 应用对象（express路由、中间件、监听端口号启动服务器都在app对象上设置）
const app = express();

// 3. 静态资源中间件：向外暴露public文件夹（客户端可以通过服务器访问public文件夹下面的所有资源）
app.use(express.static("public"));

// 4. 监听端口号启动服务器
app.listen(3000, (err) => {
  if (err) {
    console.log("服务器启动失败了", err);
    return;
  }
  console.log("服务器启动成功了");
});
