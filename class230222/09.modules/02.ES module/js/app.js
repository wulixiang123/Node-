/*
  不同暴露的方式，对应的引入方式就不一样
    如果是默认暴露（export default xxx）,引入方式 import xxx from 'xxx'
    如果是分别/统一暴露, 引入方式 import { xxx } from 'xxx'
*/

// 引入默认暴露的模块内容(模块路径和commonjs要求一致)
// import request from "./request.js";
// 引入分别暴露的内容
import { add, count } from "./module1.js";
// 引入统一暴露的内容
import { name, age, sex } from "./module2.js";

// import a from "./module3.js"; // 引入模块默认暴露的内容
// import { b, c, d } from "./module3.js"; // 引入模块分别/统一暴露的内容
// import a, { b, c, d, e } from "./module3.js";

/*
  如果只需要引入模块的部分功能 import { add, count } from "./module1.js"; 更好
    因为只会加载引入的部分功能，而不是全部

  但是如果需要引入模块的全部功能 import * as m3 from "./module3.js";
    用解构引入方式会导致命名空间的污染，不太合适，全部引入只会产生一个变量，更好

  
  默认暴露到底暴露了啥？ export default 111;
    {
      default: 111
    }
  
  分别/统一暴露暴露了啥？export { xxx, yyy }
    {
      xxx,
      yyy
    }

  引入方式 import xxx from 'xxx' 引入了啥？
    引入xxx模块暴露default上的值

  引入方式 import { xxx } from 'xxx' 引入了啥？
    引入xxx模块暴露对象上的xxx值

*/

// * 就是 所有
// 引入 module3 暴露的所有内容，命名为 m3
import * as m3 from "./module3.js";

console.log(m3);

// console.log(a);
// console.log(b, c, d);

// console.log(request);

console.log(add, count);

console.log(add(1, 1));

console.log(name, age, sex);
