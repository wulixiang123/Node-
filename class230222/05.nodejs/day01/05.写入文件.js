// 引入fs模块
const fs = require("fs");

// 同步写入文件(创建文件)
fs.writeFileSync("./test.txt", "红浪漫二楼");

// 异步写入文件
// 异步方法都有回调函数, 回调函数的第一个参数是error（错误优先机制）
fs.writeFile("./test.js", "const str = '男宾三位';", (error) => {
  /*
    error 如果有错误，是对象
    error 如果没有错误，是null
  */
  console.log(error); // null
  if (error) {
    // 出错了
    console.log(error);
    return;
  }

  // 没有错误
  console.log("异步创建（写入）文件成功");
});
