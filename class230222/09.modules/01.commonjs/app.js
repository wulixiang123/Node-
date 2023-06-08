// 模块化一定有一个主模块：index.js app.js main.js
// 模块引入语法
const _ = require("lodash"); // 别人模块。模块路径直接写模块名
const count = require("./module1"); // 自定义模块，模块路径必须 ./ ../

console.log(count(1, 1));

const person = {
  name: "jack",
};

console.log(_.cloneDeep(person));
