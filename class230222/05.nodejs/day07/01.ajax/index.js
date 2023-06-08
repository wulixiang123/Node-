const express = require("express");
const app = express();

app.use(express.static("public"));

// 用来解析 application/x-www-form-urlencoded 格式请求体参数
app.use(express.urlencoded({ extended: false }));

// 用来解析 application/json 格式请求体参数
app.use(express.json());

app.get("/test1", (req, res) => {
  console.log(req.query); // GET请求一般都是查询字符串参数
  res.json({
    code: 200,
    message: null,
    success: true,
    data: "GET /test1 请求成功",
  });
});

app.post("/test1", (req, res) => {
  console.log(req.body); // POST请求一般都是请求体参数
  res.json({
    code: 200,
    message: null,
    success: true,
    data: "POST /test1 请求成功",
  });
});

app.put("/test1", (req, res) => {
  console.log(req.body); // POST请求一般都是请求体参数
  res.json({
    code: 200,
    message: null,
    success: true,
    data: "PUT /test1 请求成功",
  });
});

app.delete("/test1", (req, res) => {
  console.log(req.query); // GET请求一般都是查询字符串参数
  res.json({
    code: 200,
    message: null,
    success: true,
    data: "DELETE /test1 请求成功",
  });
});

app.get("/test2", (req, res) => {
  setTimeout(() => {
    res.json({
      code: 200,
      message: null,
      success: true,
      data: "GET /test2 请求成功",
    });
  }, 4000);
});

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
