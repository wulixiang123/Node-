const express = require("express");
const pug = require("pug");
const Movies = require("../db/models/movies");

// 创建路由器对象: 看当做小型app对象去使用
// router对象拥有app对象的设置路由&中间件的方法
// const Router = express.Router;
// const router = new Router();
const router = new express.Router();

// 搭建路由 - 处理首页请求
router.get("/", async (req, res) => {
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
router.get("/subject/:id", async (req, res) => {
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

// 搭建路由 - 处理预告片页面请求
router.get("/trailer/:id", async (req, res) => {
  // 1. 查询预告片数据
  const { id } = req.params;

  const movie = await Movies.findOne(
    { id },
    { _id: 0, videoTitle: 1, videoUrl: 1 }
  );

  // 2. 将数据渲染到页面上
  const compileFunction = pug.compileFile("./template/trailer.pug");
  const html = compileFunction({
    movie,
  });

  // 3. 将html响应
  res.send(html);
});

module.exports = router;
