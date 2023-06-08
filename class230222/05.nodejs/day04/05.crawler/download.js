// 文档地址：https://www.npmjs.com/package/download
const download = require("download");
const fs = require("fs");

module.exports = async () => {
  const nowPlayingMovieList = JSON.parse(
    fs.readFileSync("./data/nowPlayingMovieList.json").toString()
  );

  await Promise.all(
    nowPlayingMovieList.map((movie) => download(movie.cover, "assets/images"))
  );

  const movieDetailList = JSON.parse(
    fs.readFileSync("./data/movieDetailList.json").toString()
  );

  await Promise.all(
    movieDetailList.filter(movie => movie.videoCover).map((movie) =>
      download(movie.videoCover, "assets/images")
    )
  );

  const movieVideoUrlList = JSON.parse(
    fs.readFileSync("./data/movieVideoUrlList.json").toString()
  );

  await Promise.all(
    movieVideoUrlList.map((movie) => download(movie.videoUrl, "assets/videos"))
  );
};


