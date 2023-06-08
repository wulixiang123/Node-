const fs = require("fs");

// fs.unlinkSync("test.js");

fs.unlink('test.txt', (err) => {
  if (err) {
    /*
      [Error: ENOENT: no such file or directory, unlink 'C:\Users\86176\Desktop\230222\代码\class230222\05.nodejs\day01\test.txt']
      {
        errno: -4058,
        code: 'ENOENT',
        syscall: 'unlink',
        path: 'C:\\Users\\86176\\Desktop\\230222\\代码\\class230222\\05.nodejs\\day01\\test.txt'        
      }
    */
    console.log(err);
    return;
  }
  console.log('删除文件成功');
})
