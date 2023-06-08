import a from "./m1";
import { b, c } from "./m2";
import { add } from "./m3";

console.log(a, b, c, add(1, 2));

/*
  pnpm init
  
  pnpm add webpack webpack-cli -D
    所有构建工具使用的依赖都是开发依赖
    所有src源码使用的依赖都是生产依赖

  开发模式: npx webpack ./src/app.js --mode=development
    编译ES6模块化语法
  
  生产模式: npx webpack ./src/app.js --mode=production
    编译ES6模块化语法
    压缩JS代码

  npx会将当前目录的node_modules/.bin目录临时添加环境变量，此时就能运行这个目录下的文件了
  
  问题：
    ES6其他语法没法编译
    less等文件没法编译
*/
