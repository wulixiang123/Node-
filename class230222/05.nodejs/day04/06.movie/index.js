const express = require("express");
const pug = require("pug");
const fs = require("fs");

const app = express();

// 处理图片、视频等静态资源，让浏览器可以直接访问获取
app.use(express.static("public"));

// 搭建路由 - 处理首页请求
app.get("/", (req, res) => {
  // 1. 读取数据
  // fs.readFileSync('./data/nowPlayingMovieList.json') 读取文件，返回值buffer数据
  // fs.readFileSync('./data/nowPlayingMovieList.json').toString() 将buffer数据转成json字符串
  // JSON.parse(fs.readFileSync('./data/nowPlayingMovieList.json').toString()) 将json字符串转成js对象
  const movies = JSON.parse(
    fs.readFileSync("./data/nowPlayingMovieList.json").toString()
  );

  // 2. pug渲染模板页面，传入数据
  const compileFunction = pug.compileFile("./template/index.pug");
  const html = compileFunction({
    movies,
  });

  // 3. 返回响应（响应的内容就是渲染好的html）
  res.send(html);
});

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
