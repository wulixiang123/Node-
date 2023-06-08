const express = require("express");
require("./db"); // 引入模块。就会执行模块的所有代码，连接数据库
const moviesRouter = require("./router/movies");
const booksRouter = require("./router/books");
const app = express();

// 处理图片、视频等静态资源，让浏览器可以直接访问获取
app.use(express.static("public"));

// 应用路由器：将router对象上的所有路由和中间件挂载到app对象上
app.use(moviesRouter);
app.use(booksRouter);

// 电影功能
// // 搭建路由 - 处理首页请求
// app.get("/", async (req, res) => {
//   // 1. 读取数据
//   const movies = await Movies.find(
//     {},
//     // 1和0不能混着用，但是 _id 是例外
//     { _id: 0, id: 1, cover: 1, title: 1, score: 1 }
//   );

//   // console.log(movies);

//   // 2. pug渲染模板页面，传入数据
//   const compileFunction = pug.compileFile("./template/index.pug");
//   const html = compileFunction({
//     movies,
//   });

//   // 3. 返回响应（响应的内容就是渲染好的html）
//   res.send(html);
// });

// // 搭建路由 - 处理详情页请求
// app.get("/subject/:id", async (req, res) => {
//   // 使用解构赋值语法
//   const { id } = req.params;
//   // 使用对象简写语法
//   const movie = await Movies.findOne(
//     { id },
//     { videoUrl: 0, videoTitle: 0, __v: 0, _id: 0 }
//   );

//   const compileFunction = pug.compileFile("./template/subject.pug");
//   const html = compileFunction({
//     movie,
//   });
//   res.send(html);
// });

// // 搭建路由 - 处理预告片页面请求
// app.get("/trailer/:id", async (req, res) => {
//   // 1. 查询预告片数据
//   const { id } = req.params;

//   const movie = await Movies.findOne(
//     { id },
//     { _id: 0, videoTitle: 1, videoUrl: 1 }
//   );

//   // 2. 将数据渲染到页面上
//   const compileFunction = pug.compileFile("./template/trailer.pug");
//   const html = compileFunction({
//     movie,
//   });

//   // 3. 将html响应
//   res.send(html);
// });

// 图书功能
// // 搭建路由 - 图书页
// app.get("/books", async (req, res) => {
//   res.send(`
//     <h1>图书页面</h1>
//     <a href="/books/123">跳转到图书详情</a>
//   `);
// });

// // 搭建路由 - 图书详情页
// app.get("/books/:id", async (req, res) => {
//   res.send(`
//     <h1>图书详情页面</h1>
//   `);
// });

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
