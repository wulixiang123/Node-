const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  // 1. 打开浏览器
  const browser = await puppeteer.launch({
    headless: false,
  });
  // 2. 新建标签页
  const page = await browser.newPage();
  // 3. 输入网址&跳转
  await page.goto("https://movie.douban.com/cinema/nowplaying/beijing/", {
    waitUntil: "load",
  });
  // 4. 在网址中执行脚本
  const nowPlayingMovieList = await page.evaluate(() => {
    /*
      1. 爬取的数据：id、图片、名称、评分、详情页地址
    */
    const liElList = document.querySelectorAll("#nowplaying .lists>.list-item");
    return Array.from(liElList).map((liEl) => {
      const id = liEl.id;
      const { title, score } = liEl.dataset;
      const url = liEl.querySelector(".poster .ticket-btn").href;
      const cover = liEl.querySelector(".poster img").src;
      return {
        id,
        title,
        score, // 评分
        url, // 详情页地址
        cover, // 图片
      };
    });
  });

  fs.writeFileSync(
    "nowPlayingMovieList.json",
    JSON.stringify(nowPlayingMovieList)
  );

  const movieDetailList = [];

  for (let i = 0; i < nowPlayingMovieList.length; i++) {
    const nowPlayingMovie = nowPlayingMovieList[i];
    // 跳转到电影详情页
    await page.goto(nowPlayingMovie.url, {
      waitUntil: "load",
    });

    const movieDetail = await page.evaluate(() => {
      /*
        1. 爬取的数据：电影简介、电影预告片图片、电影预告片地址
      */

      const aEl = document.querySelector(".related-pic-video");

      const summary = document
        .querySelector(`[property="v:summary"]`)
        .innerText.trim();

      const url = aEl?.href;

      const videoCover = aEl?.style.backgroundImage.split('"')[1];

      return {
        summary,
        url,
        videoCover,
      };
    });

    if (!movieDetail) continue;

    movieDetailList.push({
      ...nowPlayingMovie, // id、图片、评分、标题
      ...movieDetail, // 简介、预告片图片、预告片地址
    });
  }

  fs.writeFileSync("movieDetailList.json", JSON.stringify(movieDetailList));

  const movieVideoUrlList = [];

  for (let i = 0; i < movieDetailList.length; i++) {
    const movieDetail = movieDetailList[i];

    await page.goto(movieDetail.url, {
      waitUntil: "load",
    });

    const videoUrl = await page.evaluate(() => {
      const videoUrl = document.querySelector("video source")?.src;
      return videoUrl;
    });

    movieVideoUrlList.push({
      id: movieDetail.id,
      videoUrl,
    });
  }

  fs.writeFileSync("movieVideoUrlList.json", JSON.stringify(movieVideoUrlList));

  // 5. 关闭浏览器
  await browser.close();
})();
