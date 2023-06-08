// 当前代码是运行在一个函数中
// 所以：内部数据都是私有的
console.log(arguments.callee.toString());

/*
  function (exports, require, module, __filename, __dirname) {
    // 当前代码是运行在一个函数中
    // 所以：内部数据都是私有的
    console.log(arguments.callee.toString());
  }
    exports 模块暴露语法
    require 模块引入语法
    module  模块暴露语法
    __filename 当前模块（文件）绝对路径
    __dirname  当前模块（文件）的文件夹绝对路径
*/

// C:\Users\86176\Desktop\230222\代码\class230222\05.nodejs\day01\02.nodeFunction.js
// C:\Users\86176\Desktop\230222\代码\class230222\05.nodejs\day01
console.log(__filename, __dirname);
