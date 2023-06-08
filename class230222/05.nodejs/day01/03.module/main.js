/*
  模块化一定有一个主模块: index.js main.js app.js

    require(模块路径)
      模块路径的文件扩展名(只有三个: .js .json .node)可以省略不写
      模块类型分为两种：
        1. 你写的模块：模块路径必须以 ./ 或 ../ 开头
          Error: Cannot find module 'module1' 
          错误：找不到模块
            - 模块路径写错了
            - 自定义模块模块路径必须以 ./ 或 ../ 开头

        2. 别人写的：node自带模块（核心模块/内置模块）和 第三方模块
          模块路径直接写模块名（不能加 ./ 或 ../ 开头）

    exports

    module.exports

    exports是module.exports简写
    exports和module.exports指向同一个对象

    模块暴露的本质就是 module.exports 指向的值
      当你通过require引入的时候，引入的其实模块的 module.exports 指向的值

*/

// 引入module1
// const module1 = require("./module1.js");

// console.log(module1.add(1, 1)); // 2
// console.log(module1.person); // { name: 'jack', age: 18 }
// console.log(module1.test); // undefined

// const { add, person } = require("./module1");
// console.log(add, person);

const module1 = require("./module1");
console.log(module1); // {}

// 引入module2
const Person = require("./module2");
console.log(Person);
const p = new Person("jack");
console.log(p);
console.log([1, 2, 3, 4, 5, 6]);

// node的核心模块：用来处理路径问题
// const path = require("path");
// console.log(path);
