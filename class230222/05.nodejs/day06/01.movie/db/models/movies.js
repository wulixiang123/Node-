/**
 * 用来定义集合，有了集合就可以操作数据
 */
const mongoose = require("mongoose");

/*
  电影详情：
    {
      "id": "35209731",
      "title": "长空之王",
      "score": "6.8",
      "cover": "/assets/images/p2889598060.webp",
      "summary": "雷宇（王一博 饰）等优秀飞行员经过严苛选拔正式成为试飞员，他们在队长张挺（胡军 饰）的带领下，参与到了最新型战机的试飞。高空之上，发动机骤停甚至失火，飞机失去控制……他们一次次与死神过招，只为获取最极限的数据。随着战机交付日期的临近，任务难度逐渐升级，他们能否凯旋……",
      "videoCover": "/assets/images/2890926114.jpg"
    },
  电影预告片：
    {
      "id": "35209731",
      "videoUrl": "/assets/videos/403030613.mp4",
      "title": "长空之王 预告片1：“威”版 (中文字幕)"
    },
  首页电影列表：
    {
      "id": "35209731",
      "title": "长空之王",
      "score": "6.8",
      "cover": "/assets/images/p2889598060.webp"
    },
  
  想要存储的数据
    {
      "id": "35209731",
      "title": "长空之王",
      "score": "6.8",
      "cover": "/assets/images/p2889598060.webp",
      "summary": "雷宇（王一博 饰）等优秀飞行员经过严苛选拔正式成为试飞员，他们在队长张挺（胡军 饰）的带领下，参与到了最新型战机的试飞。高空之上，发动机骤停甚至失火，飞机失去控制……他们一次次与死神过招，只为获取最极限的数据。随着战机交付日期的临近，任务难度逐渐升级，他们能否凯旋……",
      "videoCover": "/assets/images/2890926114.jpg",
      "videoUrl": "/assets/videos/403030613.mp4",
      "videoTitle": "长空之王 预告片1：“威”版 (中文字幕)"
    }
*/

module.exports = mongoose.model("Movies", {
  // id: String,
  // title: String,
  // score: String,
  // cover: String,
  // summary: String,
  // videoCover: String,
  // videoUrl: String,
  // videoTitle: String,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  videoCover: {
    type: String,
    default: "",
  },
  videoUrl: {
    type: String,
    default: "",
  },
  videoTitle: {
    type: String,
    default: "",
  },
});
