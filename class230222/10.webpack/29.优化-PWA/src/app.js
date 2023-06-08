/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
// import _ from "lodash"; // 打包所有
// import cloneDeep from "lodash/cloneDeep"; // 只打包某个
// import a from "./js/m1";
import { b, c } from "./js/m2";
import {
  add,
  // count
} from "./js/m3";
import sum from "./js/m4";
// 引入样式 - 让 webpack 打包
// webpack 默认只能处理 js、json等资源，不能处理css等资源
// 想要webpack能够处理css资源，需要使用loader
import "./css/reset.css";
import "./css/index.less";
import "./css/iconfont.css";

console.log(b, c, add(4, 5));

// 动态导入模块（一定将这个模块单独打包成js文件）
// 按需加载
document.getElementById("btn").onclick = () => {
  import(/* webpackChunkName: "m1" */ "./js/m1")
    .then((m1) => {
      console.log(m1);
    })
    .catch(() => {
      console.log("加载失败了");
    });
};

// console.log(cloneDeep({ name: "jack" }));

console.log(sum(1, 2, 3, 4));

// count(2, 2)();

// if (module.hot) {
//   // 该文件发生变化，就不会刷新整个页面了
//   module.hot.accept("./js/m1", () => {
//     // 监视变化，只做局部更新
//     console.log(a);
//   });
//   module.hot.accept("./js/m3");
// }

const p = Promise.resolve();

p.then(() => console.log("hello promise resolve"));

const arr = [1, 2, 3, 4];
console.log(arr.includes(1));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
