const express = require("express");
const Users = require("../db/models/users");

const router = new express.Router();

// 解析form表单提交的请求体参数，将来可以通过req.body获取
// router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// username 长度6-18位，只能包含英文、数字和下划线
const usernameReg = /^[a-zA-Z0-9_]{6,18}$/;
// password 长度8-20位，只能包含英文、数字和下划线
const passwordReg = /^[a-zA-Z0-9_]{8,20}$/;

// 注册路由
router.post("/register", async (req, res) => {
  /*
    注册需求：将用户的数据存储到数据库中
      1. 获取用户提交的表单数据（username、password、rePassword）
      2. 对用户提交的表单数据进行正则校验（表单校验）
        - 校验数据必须符合正则要求
          - username 长度6-18位，只能包含英文、数字和下划线
          - password 长度8-20位，只能包含英文、数字和下划线
        - 两次密码输入要一致
      3. 检查用户是否被注册过（为了确保用户名唯一）
        一旦前面步骤出现问题，就要返回失败响应（失败原因）
          {
            code: 201, // 非200，就是失败
            message: '该用户被注册了', // 失败的响应失败原因
            success: false, // 成功/失败的标识
            data: null // 成功的响应数据
          }
      4. 将用户数据给存储到数据库中
      5. 返回成功响应（注册成功）
          {
            code: 200, // 200，才是成功
            message: null,
            success: true,
            data: '注册成功'
          }
  */

  // 1. 获取用户提交的表单数据（username、password、rePassword）
  // 默认express框架不解析请求体数据，需要借助中间件
  // const { username, password, rePassword } = req.body;
  const { username, password } = req.body;
  // console.log(username, password, rePassword);

  // 2. 对用户提交的表单数据进行正则校验（表单校验）

  if (!usernameReg.test(username)) {
    // 用户名校验失败
    res.json({
      code: 201,
      message: "用户名长度6-18位，只能包含英文、数字和下划线",
      success: false,
      data: null,
    });
    return;
  }

  if (!passwordReg.test(password)) {
    // 密码校验失败
    res.json({
      code: 201,
      message: "密码长度6-18位，只能包含英文、数字和下划线",
      success: false,
      data: null,
    });
    return;
  }

  // if (password !== rePassword) {
  //   // 两次密码输入不一样
  //   res.json({
  //     code: 201,
  //     message: "两次密码输入不一样",
  //     success: false,
  //     data: null,
  //   });
  //   return;
  // }

  // 3. 检查用户是否被注册过（为了确保用户名唯一）
  const user = await Users.findOne({ username });
  if (user) {
    res.json({
      code: 202,
      message: "用户名已存在",
      success: false,
      data: null,
    });
    return;
  }

  console.log(username, password);

  // 4. 将用户数据给存储到数据库中
  await Users.create({
    username,
    password,
  });

  // 5. 返回成功响应（注册成功）
  res.json({
    code: 200,
    message: null,
    success: true,
    data: "注册成功",
  });
});

// 登录路由
router.post("/login", async (req, res) => {
  /*
    登录需求：
      1. 获取用户提交的表单数据（username, password）
      2. 对用户提交的表单数据进行正则校验（表单校验）
        - 校验数据必须符合正则要求
          - username 长度6-18位，只能包含英文、数字和下划线
          - password 长度8-20位，只能包含英文、数字和下划线
      3. 检查用户名是否存在
      4. 判断密码是否正确
      5. 返回登录成功
  */
  // 1. 获取用户提交的表单数据（username, password）
  const { username, password } = req.body;

  // 2. 对用户提交的表单数据进行正则校验（表单校验）
  if (!usernameReg.test(username)) {
    // 用户名校验失败
    res.json({
      code: 201,
      message: "用户名长度6-18位，只能包含英文、数字和下划线",
      success: false,
      data: null,
    });
    return;
  }

  if (!passwordReg.test(password)) {
    // 密码校验失败
    res.json({
      code: 201,
      message: "密码长度6-18位，只能包含英文、数字和下划线",
      success: false,
      data: null,
    });
    return;
  }

  // 3. 检查用户名是否存在
  const user = await Users.findOne({ username });
  if (!user) {
    res.json({
      code: 203,
      message: "用户名不存在",
      success: false,
      data: null,
    });
    return;
  }

  // 4. 判断密码是否正确
  if (password !== user.password) {
    res.json({
      code: 204,
      message: "密码错误",
      success: false,
      data: null,
    });
    return;
  }

  // 5. 返回登录成功
  res.json({
    code: 200,
    message: null,
    success: true,
    data: "登录成功",
  });
});

module.exports = router;
