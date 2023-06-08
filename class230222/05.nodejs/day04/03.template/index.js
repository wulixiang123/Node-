const express = require("express");
// 1. 下载pug pnpm add pug
// 2. 引入pug
const pug = require("pug");

const app = express();

const movies = [
  {
    id: 1,
    name: "灌篮高手",
  },
  {
    id: 2,
    name: "长空之王",
  },
];

// app.use(express.static("public"));

app.get("/", (req, res) => {
  // 服务端渲染 SSR

  // 3. 创建编译函数（指定要编译pug模板页面）
  const compileFunction = pug.compileFile("./template/index.pug");
  // 4. 将pug模板页面编译成html页面（传入数据）
  const html = compileFunction({
    movies,
  });

  // console.log(html);

  res.send(html);

  // res.send(`
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="UTF-8" />
  //       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //       <title>硅谷电影-首页</title>
  //     </head>
  //     <body>
  //       <h1>硅谷电影-首页</h1>
  //       ${movies
  //         .map((movie) => {
  //           return `<li>${movie.name}</li>`;
  //         })
  //         .join("")}
  //     </body>
  //   </html>
  // `);
});

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
