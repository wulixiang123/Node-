const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// 解析cookie，将cookie字符串解析成js对象
// 提供了设置cookie的方法 res.cookie()
app.use(cookieParser());

const users = [
  {
    id: "1",
    username: "admin",
    password: "111111",
    nickname: "管理员",
  },
  {
    id: "2",
    username: "test",
    password: "111111",
    nickname: "测试用户",
  },
];

/*
  正常发送请求：
    1. 浏览器向服务器发送获取用户数据
    2. 服务器没办法区别是哪个用户发送的请求，就没办法返回响应

  cookie 开发流程：
    1. 用户先进行登录，向服务器发送登录请求
    2. 服务器验证用户名和密码是否正确，如果正确情况下，生成一个 cookie（根据用户数据来生成cookie），将cookie以响应头形式返回浏览器
    3. 浏览器就能接受到 cookie，浏览器会将cookie自动存储起来（Chrome开发者调试工具 - application - cookie）
    4. 浏览器下次发送请求，以请求头形式会自动携带上所有 cookie 
    5. 服务器解析 cookie 得到用户数据（从而识别是哪个用户），最终给浏览器返回对应用户数据

  服务器操作cookie
    设置cookie: res.set('Set-Cookie', 'key=value;max-age=123456;')
    读取cookie: req.headers.cookie (读取到的cookie需要解析才能使用)

    简化使用：cookie-parser
      pnpm add cookie-parser
      const cookieParser = require("cookie-parser");
      app.use(cookieParser());

      功能：
        设置cookie: res.cookie(key, value, options)
        读取cookie: req.cookies

  客户端操作cookie
    document.cookie (读写二合一)

  
*/

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (user) {
    // 响应 cookie （位于响应头）
    // res.set("Set-Cookie", `userId=${user.id};max-age=${3600 * 24}`);
    res.cookie("userId", user.id, {
      maxAge: 3600 * 24 * 7,
      httpOnly: true, // 禁止客户端（浏览器）操作 cookie
    });

    res.json({
      code: 200,
      data: "登录成功",
    });
    return;
  }

  res.json({
    code: 201,
    message: "登录失败",
  });
});

app.get("/userInfo", (req, res) => {
  // 'userId=1';
  // const [cookieName, cookieValue] = req.headers.cookie.split("=");
  // const user = users.find((user) => user.id === cookieValue);

  // test=123456; userId=2 自己解析的
  // const cookies = req.headers.cookie.split(";").reduce((p, c) => {
  //   let [key, value] = c.split("=");
  //   key = key.trim();
  //   value = value.trim();
  //   p[key] = value;
  //   return p;
  // }, {});

  // 中间件 cookie-parser 解析的
  console.log(req.cookies);

  const user = users.find((user) => user.id === req.cookies.userId);

  if (user) {
    res.json({
      code: 200,
      data: user.nickname,
    });
    return;
  }

  res.status(401).end();
});

app.listen(3000);
