console.log("hello nodejs");

/*
  浏览器JavaScript由什么组成：
    DOM document
    BOM window
      setTimeout / setInterval
      location
      history
    ECMAScript ES规范

  Nodejs中JavaScript由什么组成：
    没有DOM
    包含少量BOM：
      console / setTimeout / setInterval
      任何和浏览器相关的API没有实现
      global
    ECMAScript 全部实现了
*/

// ReferenceError: window is not defined
// 当访问一个不存在的变量，就会报这个错误
// console.log(window);

console.log(global); // Nodejs中全局对象


