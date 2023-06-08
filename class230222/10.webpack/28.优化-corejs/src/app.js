/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
// import "core-js"; // 全部引入，引入所有es6+语法兼容
// import "core-js/es/promise"; // 手动按需引入
// import "core-js/es/array/includes";

const p = Promise.resolve();

p.then(() => console.log("hello promise resolve"));

const arr = [1, 2, 3, 4];
console.log(arr.includes(1));
