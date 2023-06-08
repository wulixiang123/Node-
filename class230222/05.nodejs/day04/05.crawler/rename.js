const fs = require("fs");

module.exports = async () => {
  const movieDetailList = JSON.parse(
    fs.readFileSync("./data/movieDetailList.json").toString()
  );

  movieDetailList.forEach((movie) => {
    const coverArr = movie.cover.split("/");
    const cover = "/assets/images/" + coverArr[coverArr.length - 1];
    movie.cover = cover;

    if (!movie.videoCover) return;

    const videoCoverArr = movie.videoCover.split("/");
    const videoCover =
      "/assets/images/" + videoCoverArr[videoCoverArr.length - 1];
    movie.videoCover = videoCover;
  });

  fs.writeFileSync(
    "./data/movieDetailList.json",
    JSON.stringify(movieDetailList)
  );

  const movieVideoUrlList = JSON.parse(
    fs.readFileSync("./data/movieVideoUrlList.json").toString()
  );

  movieVideoUrlList.forEach((movie) => {
    const videoUrlArr = movie.videoUrl.split("/");
    const videoUrl = "/assets/videos/" + videoUrlArr[videoUrlArr.length - 1];
    movie.videoUrl = videoUrl;
  });

  fs.writeFileSync(
    "./data/movieVideoUrlList.json",
    JSON.stringify(movieVideoUrlList)
  );

  const nowPlayingMovieList = JSON.parse(
    fs.readFileSync("./data/nowPlayingMovieList.json").toString()
  );

  nowPlayingMovieList.forEach((movie) => {
    const coverArr = movie.cover.split("/");
    const cover = "/assets/images/" + coverArr[coverArr.length - 1];
    movie.cover = cover;
  });

  fs.writeFileSync(
    "./data/nowPlayingMovieList.json",
    JSON.stringify(nowPlayingMovieList)
  );
};

