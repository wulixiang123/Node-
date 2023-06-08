# 用户管理练习

## 1. 准备工作

1. 搭建目录

- client 客户端代码
- server 服务器代码
- docs 项目开发文档

2. 开发流程

- 先开发服务器
- 在开发客户端

## 2. 服务器基本代码

1. 初始化 package.json

```
# npm
npm init -y
# pnpm
pnpm init
```

2. 下载服务器需要的依赖包

```
# npm
npm i express cors mongoose
# pnpm
pnpm add express cors mongoose
```

3. 搭建基本服务器代码

```js
// server/index.js
const express = require("express");

const app = express();

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功了");
});
```

## 3. 数据库基本代码

1. 搭建连接数据库模块

```js
// server/db/index.js
const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://127.0.0.1:27017/user-project");
```

2. 搭建用户管理集合模块

```js
// server/db/models/users.js
const mongoose = require("mongoose");

module.exports = mongoose.model("users", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  // 软删除
  deleted: {
    type: Boolean,
    default: false,
  },
});
```

3. 将连接数据库模块在服务器引入，让其连接数据库，这样将来就能操作数据库了

```js
// server/index.js
const express = require("express");
// 用来连接数据库
require("./db");

const app = express();

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功了");
});
```

## 4. 搭建路由器模块

用来分类管理路由和中间件

1. 定义 users 路由器模块

```js
// server/routers/user.js
const express = require("express");

const router = new express.Router();

module.exports = router;
```

2. 在主模块汇总路由器

```js
// server/index.js
const express = require("express");
// 用来连接数据库
require("./db");
// 引入路由器
const usersRouter = require("./routers/users");

const app = express();
// 使用路由器: 路由器绑定的所有路由或中间件都会在app上生效
app.use(usersRouter);

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功了");
});
```

## 5. 搭建路由&定义接口

### 5.1. 分析需要定义的接口

1. 获取用户列表展示接口
2. 添加用户接口
3. 修改用户接口
4. 删除用户接口

### 5.2. 获取用户列表展示接口

1. 分析接口定义

- 请求方式： `GET`
- 请求地址：`/user/:page/:limit`
- 请求参数：
  - `page` 当前页码（第几页）
  - `limit` 每页条数（每页几条）
- 响应返回值：
  ```js
  {
    code: 200,
    message: '',
    success: true,
    data: {
      total: 100, // 数据总数，将来给分页器使用
      users: [] // 数据
    }
  }
  ```

2. 定义路由

**注意：代码其他内容省略了，只放置主要内容，后面都这样**

```js
const Users = require("../db/models/users");

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
```

### 5.3. 添加用户接口

1. 分析接口定义

- 请求方式： `POST`
- 请求地址：`/user/save`
- 请求参数：
  - `username` 用户名
  - `password` 密码
  - `nickname` 用户昵称
- 响应返回值：
  ```js
  {
    code: 200,
    message: '',
    success: true,
    data: null
  }
  ```

2. 下载依赖

```
# npm
npm i md5
# pnpm
pnpm add md5
```

3. 解析请求体参数

因为可能有多个路由器都需要请求体参数，所以定义在主模块，这样所有路由器都能使用了

```js
const express = require("express");
require("./db");
const usersRouter = require("./routers/users");

const app = express();

// 解析json格式请求体数据
app.use(express.json());

app.use(usersRouter);

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功了");
});
```

4. 定义路由

```js
const md5 = require("md5");

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
```

### 5.4. 修改用户接口

1. 分析接口定义

- 请求方式： `PUT`
- 请求地址：`/user/update`
- 请求参数：
  - `id` 用户 id
  - `password` 密码
  - `nickname` 用户昵称
- 响应返回值：
  ```js
  {
    code: 200,
    message: '',
    success: true,
    data: null
  }
  ```

2. 定义路由

```js
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
```

### 5.5. 删除用户接口

1. 分析接口定义

- 请求方式： `DELETE`
- 请求地址：`/user/delete/:id`
- 请求参数：
  - `id` 用户 id
- 响应返回值：
  ```js
  {
    code: 200,
    message: '',
    success: true,
    data: null
  }
  ```

2. 定义路由

```js
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
```

## 6. cors 解决跨域

```js
const cors = require("cors");

// 使用cors解决跨域
app.use(cors());
```

## 7. 搭建用户管理静态页面

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>用户管理</title>
    <link rel="stylesheet" href="./css/bootstrap.min.css" />
    <link rel="stylesheet" href="./css/user.css" />
  </head>
  <body>
    <div id="app">
      <div class="card">
        <div class="card-body">
          <!-- 1. 添加用户按钮 -->
          <button type="button" class="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            添加用户
          </button>

          <!-- 2. 表格 -->
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">序号</th>
                <th scope="col">用户名</th>
                <th scope="col">用户昵称</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                  <button type="button" class="btn btn-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                    修改用户
                  </button>
                  <button type="button" class="btn btn-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                      />
                    </svg>
                    删除用户
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 3. 分页器 -->
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <script src="./js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

```css
#app {
  padding: 20px;
}
.table {
  margin: 20px 0;
}
.btn-warning {
  color: #fff;
}
.btn-warning:hover {
  color: #fff;
}
.page-link {
  color: #333;
}
```
