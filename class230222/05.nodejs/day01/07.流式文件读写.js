const fs = require("fs");

// 创建文件可读流（持续读取文件内容，每次读取文件一部分内容）
const rs = fs.createReadStream(
  "C:\\Users\\86176\\Desktop\\230222\\02.介绍.mp4"
);

// 创建文件可写流
const ws = fs.createWriteStream("hello.mp4");

// 管道
// 可读流每次读取一部分文件内容，顺着管道将内容传递给可写流
// 可写流接受文件内容，将其写入文件里去
rs.pipe(ws);
