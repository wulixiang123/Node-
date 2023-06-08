/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
// import _ from "lodash"; // 打包所有
import cloneDeep from "lodash/cloneDeep"; // 只打包某个
import a from "./js/m1";
import { b, c } from "./js/m2";
import {
  add,
  // count
} from "./js/m3";
// 引入样式 - 让 webpack 打包
// webpack 默认只能处理 js、json等资源，不能处理css等资源
// 想要webpack能够处理css资源，需要使用loader
import "./css/reset.css";
import "./css/index.less";
import "./css/iconfont.css";

console.log(a, b, c, add(3, 5));

console.log(cloneDeep({ name: "jack" }));

// count(2, 2)();

// if (module.hot) {
//   // 该文件发生变化，就不会刷新整个页面了
//   module.hot.accept("./js/m1", () => {
//     // 监视变化，只做局部更新
//     console.log(a);
//   });
//   module.hot.accept("./js/m3");
// }
