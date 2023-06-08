const express = require("express");
const app = express();

app.get("/testJSONP", (req, res) => {
  // res.json({
  //   code: 200,
  //   message: null,
  //   success: true,
  //   data: "GET /testJSONP 请求成功",
  // });
  const { callback } = req.query;

  const data = {
    code: 200,
    message: null,
    success: true,
    data: "GET /testJSONP 请求成功",
  };

  // 'getData({ "code": 200, "message": null, ... })'
  res.send(`${callback}(${JSON.stringify(data)})`);
});

app.listen(3000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
});
