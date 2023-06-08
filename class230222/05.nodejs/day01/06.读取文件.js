const fs = require("fs");

const file = fs.readFileSync("test.txt");
console.log(file.toString());

fs.readFile("test.js", (error, file) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("文件读取成功", file.toString());
});

fs.readFile("1.jpeg", (error, file) => {
  if (error) {
    console.log(error);
    return;
  }
  // console.log("文件读取成功", file);
  // console.log("文件读取成功", file.toString());

  fs.writeFile("../2.jpeg", file, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("文件写入成功");
  });
});
