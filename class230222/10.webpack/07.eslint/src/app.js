import a from "./js/m1";
import { b, c } from "./js/m2";
import { add } from "./js/m3";
// 引入样式 - 让 webpack 打包
// webpack 默认只能处理 js、json等资源，不能处理css等资源
// 想要webpack能够处理css资源，需要使用loader
import "./css/reset.css";
import "./css/index.less";
import "./css/index.scss";
import "./css/iconfont.css";
// eslint-disable-next-line
console.log(a, b, c, add(1, 2))
