const db = require("../db");

const Movies = require("../db/models/movies");

const movieDetailList = require("./movieDetailList");
const movieVideoUrlList = require("./movieVideoUrlList");

// console.log(movieDetailList, movieVideoUrlList);

(async () => {
  // 1. 等待连接数据库
  await db;
  // 2. 对现有数据进行整理
  // 现在有两个数组，需要合并成一个数组
  const movies = movieDetailList.map((movieDetail) => {
    // 去movieVideoUrlList找到对应movieDetail的预告片数据
    const movieVideo = movieVideoUrlList.find(
      /*
        箭头函数简写：
          1. 如果参数只有一个，可以省略()
          2. 如果语句只有一条，可以省略{}，默认会将这条语句return
      */
      (movieVideo) => movieVideo.id === movieDetail.id
      // movieVideo => {
      //   return movieVideo.id === movieDetail.id
      // }
    );

    if (movieVideo) {
      // 将预告片数据和movieDetail合并成一个对象
      return {
        ...movieDetail,
        videoTitle: movieVideo.title,
        videoUrl: movieVideo.videoUrl,
      };
    } else {
      // 直接返回movieDetail
      return movieDetail;
    }
  });
  // 3. 对数据库进行操作
  await Movies.insertMany(movies);

  console.log("存储成功");
})();
