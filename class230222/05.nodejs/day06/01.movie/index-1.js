const express = require("express");
const pug = require("pug");
const db = require("./db");
const Movies = require("./db/models/movies");

// 注意：前面需要加分号
(async () => {
  // 1. 等数据库连接成功
  await db;
  console.log("数据库连接成功");

  const app = express();

  // 处理图片、视频等静态资源，让浏览器可以直接访问获取
  app.use(express.static("public"));

  // 搭建路由 - 处理首页请求
  app.get("/", async (req, res) => {
    // 1. 读取数据
    const movies = await Movies.find(
      {},
      // 1和0不能混着用，但是 _id 是例外
      { _id: 0, id: 1, cover: 1, title: 1, score: 1 }
    );

    // console.log(movies);

    // 2. pug渲染模板页面，传入数据
    const compileFunction = pug.compileFile("./template/index.pug");
    const html = compileFunction({
      movies,
    });

    // 3. 返回响应（响应的内容就是渲染好的html）
    res.send(html);
  });

  // 搭建路由 - 处理详情页请求
  app.get("/subject/:id", async (req, res) => {
    // 使用解构赋值语法
    const { id } = req.params;
    // 使用对象简写语法
    const movie = await Movies.findOne(
      { id },
      { videoUrl: 0, videoTitle: 0, __v: 0, _id: 0 }
    );

    const compileFunction = pug.compileFile("./template/subject.pug");
    const html = compileFunction({
      movie,
    });
    res.send(html);
  });

  app.listen(3000, (err) => {
    if (err) console.log("服务器启动失败", err);
    else console.log("服务器启动成功");
  });
})();
