/*
  load事件：等页面所有资源（html、css、js、img等）加载完毕，触发当前事件（触发时机更慢）
  DOMContentLoaded事件: 等DOM元素渲染好（加载好），触发当前事件（触发时机更快）
    window.addEventListener('DOMContentLoaded', function () {})

    on绑定事件：只能绑定1个回调函数
    addEventListener绑定事件：可以绑定n个回调函数
*/
window.onload = function () {
  /*
    使用swiper轮播图
      1. 引入swiper css和js文件
      2. 准备固定DOM结构
      3. new Swiper让轮播生效
  */
  // 1. 创建轮播图
  // 一旦引入swiper-bundle.min.js，这个文件向外暴露一个全局变量 Swiper（构造函数）
  // https://swiperjs.com/get-started#initialize-swiper
  new Swiper(".swiper", {
    // direction: "vertical", // 轮播方向（默认值是水平方向）
    loop: true, // 无限轮播（默认值是false）
    pagination: {
      // 小圆点
      el: ".swiper-pagination",
    },
    // 开启自动轮播
    // https://swiperjs.com/swiper-api#autoplay
    autoplay: {
      delay: 1000, // 轮播的时间
      pauseOnMouseEnter: true, // 鼠标移入暂停轮播
      stopOnLastSlide: true, // 最后一张停止轮播
      disableOnInteraction: false,
    },

    // 左右翻页（箭头）
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },

    // 滚动条
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    // },
  });
};
