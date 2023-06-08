const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    name: "session_id", // 生成的cookie的名称
    secret: "sh0jkA3", // 参与session加密的字符串
    resave: false, // 不要强制保存session，相同会话只生成一个
    saveUninitialized: true, // 强制保存未初始化的session
    cookie: { maxAge: 3600 * 24 }, // cookie的设置
  })
);

/*
  session 工作流程：
    1. 浏览器向服务器发送登录请求
    2. 服务器验证用户名和密码是否正确，创建一个session对象，内部存储当前用户数据，
      每个session对象会生成唯一的id（session_id）, 将 session_id 以 cookie 的形式响应给浏览器
    3. 浏览器接受到响应，自动保存 cookie
    4. 下一次浏览器发送请求，会自动携带上 cookie
    5. 服务器解析cookie，得到session_id，再去session中到对应id的session对象，从而得到用户数据
    6. 服务器响应相应的用户数据给浏览器
*/

app.get("/login", (req, res) => {
  // session对象中间件生成的
  // 直接往session对象中存储当前用户数据，
  req.session.username = "管理员";
  // 自动生成session_id，自动以cookie形式响应

  res.json({
    code: 200,
    data: "登录成功",
  });
});

app.get("/user", (req, res) => {
  // 中间件解析cookie，得到session_id，再去session中到对应id的session对象，将对象内容挂载到req.session上
  const username = req.session.username;

  res.json({
    code: 200,
    data: username,
  });
});

app.listen(3000);
