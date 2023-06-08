/*
  默认暴露只能使用一次
  统一暴露、分别暴露可以使用多次

  同时：默认暴露、统一暴露、分别暴露可以一起使用

  通常情况下：一个模块只用一种暴露语法
  特殊情况：
    模块最重要的内容，采用默认暴露
    其他次要内容，采用分别/统一暴露
*/

const a = 111;

// 分别暴露 b c
export const b = 222;
export const c = 333;

const d = 444;
const e = 555;

// 统一暴露 d e
export { d, e };

// 默认暴露a
export default a;
