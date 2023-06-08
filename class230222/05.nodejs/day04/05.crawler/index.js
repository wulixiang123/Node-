const crawler = require("./crawler");
const download = require("./download");
const rename = require("./rename");

(async () => {
  // 1. 爬取数据
  await crawler();
  // 2. 因为豆瓣图片和电影做了防盗链，需要下载下来使用
  await download();
  // 3. 重命名
  await rename();

  console.log("全部完成了~~~");
})();
