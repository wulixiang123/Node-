const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
/*
  token 工作流程：
    1. 浏览器发送登录请求给服务器
    2. 服务器处理（检测用户名和密码是否正确），将用户数据通过jwt算法进行加密生成一个token
    将token（以响应体形式）响应给浏览器
    3. 浏览器接受数据将响应体数据中token存储起来
    4. 将来发送请求浏览器需要将token（以请求头形式）携带上
    5. 服务器通过解析请求头得到token，通过jwt算法进行解密，得到之前保存用户数据
    6. 将用户数据响应给浏览器
*/

const secret = "d5(1Ts;2";

// 加密
function sign(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data, // 需要加密的数据
      secret, // 参与加密的字符串
      {
        expiresIn: "7d", // token过期时间
      },
      (err, token) => {
        // 回调函数（传了回调函数就是异步方法，不传就是同步方法）
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}
// 解密
function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret, // 参与加密的字符串
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

app.get("/login", async (req, res) => {
  // 2. 将用户数据通过jwt算法进行加密生成一个token
  const user = {
    username: "管理员",
  };

  const token = await sign(user); // 加密

  res.json({
    code: 200,
    data: token,
  });
});

// 对除了登录接口以外所有接口进行统一处理
app.use(async (req, res, next) => {
  try {
    const token = req.headers.token;
    const user = await verify(token); // 解密
    req.user = user;
    next();
  } catch (e) {
    console.log(e.message);
    if (e.message === "jwt expired") {
      // token过期了
      res.status(407).end("jwt expired");
    } else if (e.message === "jwt malformed") {
      res.status(401).end("jwt malformed");
    } else if (e.message === "invalid token") {
      res.status(401).end("invalid token");
    }
  }
});

app.get("/user", (req, res) => {
  res.json({
    code: 200,
    data: req.user.username,
  });
});

// app.get("/user", async (req, res) => {
//   try {
//     const token = req.headers.token;

//     const user = await verify(token); // 解密

//     res.json({
//       code: 200,
//       data: user.username,
//     });
//   } catch (e) {
//     console.log(e.message);
//     if (e.message === "jwt expired") {
//       // token过期了
//       res.status(407).end("jwt expired");
//     } else if (e.message === "jwt malformed") {
//       res.status(401).end("jwt malformed");
//     } else if (e.message === "invalid token") {
//       res.status(401).end("invalid token");
//     }
//   }
// });

app.listen(3000);
