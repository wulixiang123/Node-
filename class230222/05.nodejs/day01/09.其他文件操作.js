const fs = require("fs");

// 英文文档：https://nodejs.org/dist/latest-v18.x/docs/api/fs.html
// 中文文档：http://www.nodejs.com.cn/api/fs.html
// 剪贴
// 重命名完原文件会被删除
fs.rename("1.jpeg", "2.jpeg", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("文件重命名成功");
});
