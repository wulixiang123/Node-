const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  // 1. 打开浏览器
  const browser = await puppeteer.launch({
    headless: false,
  });
  // 2. 新建标签页
  const page = await browser.newPage();
  // 3. 输入网址并跳转
  await page.goto("https://movie.douban.com/cinema/nowplaying/beijing/", {
    waitUntil: "load", // 等待直到onload触发完毕
  });
  // 4. 爬取数据

  // 爬取正在上映电影的url
  const result = await page.evaluate(() => {
    // 将函数在页面运行
    // const result = []
    // 正在上映电影对象
    // const liELList = document.querySelectorAll('.lists > li');

    // liELList.forEach(liEl => {
    //   const url = liEl.querySelector('.ticket-btn').href;
    //   result.push(url);
    // })
    const liELList = document.querySelectorAll("#nowplaying .lists > li");

    const result = Array.from(liELList)
      .slice(0, 10)
      .map((liEl) => liEl.querySelector(".ticket-btn").href);

    return result;
  });

  // 爬取正在上映电影的详情内容
  const movieDetails = [];

  for (let i = 0; i < result.length; i++) {
    const url = result[i];

    // 跳转正在上映电影的详情页面
    await page.goto(url, {
      waitUntil: "load", // 等待直到onload触发完毕
    });

    // 爬取详情数据
    const detail = await page.evaluate(() => {
      const title = document.querySelector(
        '[property="v:itemreviewed"]'
      ).innerText;
      const cover = document.querySelector("#mainpic img").src;
      const summary = document
        .querySelector(`[property="v:summary"]`)
        .innerText.trim();
      const videoUrl = document.querySelector(".related-pic-video")?.href;
      return {
        title,
        cover,
        summary,
        videoUrl,
      };
    });

    movieDetails.push(detail);
  }

  // 爬取正在上映电影的预告片
  for (let i = 0; i < movieDetails.length; i++) {
    const detail = movieDetails[i];

    if (!detail.videoUrl) {
      continue;
    }

    await page.goto(detail.videoUrl, {
      waitUntil: "load", // 等待直到onload触发完毕
    });

    // 爬取详情数据
    const video = await page.evaluate(() => {
      const url = document.querySelector("video source").src;
      return url;
    });

    detail.video = video;
  }

  fs.writeFileSync("movies.json", JSON.stringify(movieDetails));

  // 5. 关闭浏览器
  await browser.close();
})();
