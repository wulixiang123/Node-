const express = require("express");

const app = express();

app.use(express.static("public"));

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

// 生成唯一的id
function createUId() {
  return Math.random().toString().substring(2) + Date.now();
}

const sessions = {
  // key: session_id
  // value: 用户数据
};

// 1. 浏览器向服务器发送登录请求
app.get("/login", (req, res) => {
  //  2. 服务器验证用户名和密码是否正确，创建一个session对象，内部存储当前用户数据，
  const session = {
    username: "管理员",
  };
  // 每个session对象会生成唯一的id（session_id）, 将 session_id 以 cookie 的形式响应给浏览器
  const session_id = createUId();

  sessions[session_id] = session;

  res.set("Set-Cookie", `session_id=${session_id};maxAge=${3600}`);

  res.json({
    code: 200,
    data: "登录成功",
  });
});

// 4. 下一次浏览器发送请求，会自动携带上 cookie
app.get("/user", (req, res) => {
  // 5. 服务器解析cookie，得到session_id，再去session中到对应id的session对象，从而得到用户数据
  const cookies = req.headers.cookie.split(";").reduce((p, c) => {
    let [key, value] = c.split("=");
    key = key.trim();
    value = value.trim();
    p[key] = value;
    return p;
  }, {});

  const { session_id } = cookies;

  const session = sessions[session_id];

  // 6. 服务器响应相应的用户数据给浏览器
  res.json({
    code: 200,
    data: session.username,
  });
});

app.listen(3000);
