const express = require("express");
const md5 = require("md5");
const Users = require("../db/models/users");

const router = new express.Router();

/*
  1. 获取用户列表展示接口
    请求方式    GET
    请求地址    
      /user/:page/:limit
    请求参数    
      page  当前页码（第几页）
      limit 每页条数（每页几条）
    响应返回值
      {
        code: 200,
        message: '',
        success: true,
        data: {
          total: 总数,
          users: []
        }
      }

  2. 添加用户接口
    请求方式    POST
    请求地址    
      /user/save
    请求参数    
      username 用户名
      password 密码
      nickname 用户昵称
    响应返回值
      {
        code: 200,
        message: '',
        success: true,
        data: null
      }

  3. 修改用户接口
    请求方式    PUT
    请求地址    
      /user/update
    请求参数    
      id        用户id
      password  密码
      nickname  用户昵称
    响应返回值
      {
        code: 200,
        message: '',
        success: true,
        data: null
      }

  4. 删除用户接口
    请求方式    DELETE
    请求地址    
      /user/delete/:id
    请求参数    
      id        用户id
    响应返回值
      {
        code: 200,
        message: '',
        success: true,
        data: null
      }
*/

// 1. 获取用户列表展示接口
router.get("/user/:page/:limit", async (req, res) => {
  try {
    const { page, limit } = req.params;

    // deleted: true 代表数据被删除了，被删除的数据不能被查询出来
    // Users.find({ deleted: false }, { __v: 0, password: 0, deleted: 0 })  1-100条
    // .skip(10) 跳过10条 11-100条
    // .limit(10) 限制查询的数量 10 条 11-20条
    /*
    page limit  查询条数
     1    10      1-10
     2    10      11-20
     3    10      21-30
     (page - 1) * limit
  */
    // 分页查询
    const users = await Users.find(
      { deleted: false },
      { __v: 0, password: 0, deleted: 0 }
    )
      .skip((page - 1) * limit)
      .limit(limit);

    // 得到数据总数
    const total = await Users.countDocuments({ deleted: false });

    res.json({
      code: 200,
      message: "",
      success: true,
      data: {
        total,
        users,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).end("error");
  }
});

// 2. 添加用户接口
router.post("/user/save", async (req, res) => {
  try {
    // 请求体参数必须使用中间件解析才能使用
    const { username, password, nickname } = req.body;

    if (!username || !password || !nickname) {
      return res.json({
        code: 201,
        message: "缺少必要参数，请填写完整请求参数",
        success: false,
        data: null,
      });
    }

    const user = await Users.findOne({ username });

    if (user) {
      // 重复了
      return res.json({
        code: 202,
        message: "用户名已存在",
        success: false,
        data: null,
      });
    }

    await Users.create({
      username,
      password: md5(password), // 使用md5对密码进行加密，得到密文
      nickname,
    });

    res.json({
      code: 200,
      message: "",
      success: true,
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

// 3. 修改用户接口
router.put("/user/update", async (req, res) => {
  try {
    const { id, password, nickname } = req.body;

    if (!id || !password || !nickname) {
      return res.json({
        code: 201,
        message: "缺少必要参数，请填写完整请求参数",
        success: false,
        data: null,
      });
    }

    const user = await Users.findOne({ _id: id, deleted: false });

    if (!user) {
      return res.json({
        code: 203,
        message: "用户找不到",
        success: false,
        data: null,
      });
    }

    await Users.updateOne(
      { _id: id, deleted: false },
      { password: md5(password), nickname }
    );

    res.json({
      code: 200,
      message: "",
      success: true,
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

// 4. 删除用户接口
router.delete("/user/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({ _id: id, deleted: false });

    if (!user) {
      return res.json({
        code: 203,
        message: "用户找不到",
        success: false,
        data: null,
      });
    }

    await Users.updateOne({ _id: id }, { deleted: true });

    res.json({
      code: 200,
      message: "",
      success: true,
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

module.exports = router;
