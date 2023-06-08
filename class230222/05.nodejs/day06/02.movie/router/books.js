const express = require("express");

const router = new express.Router();

// 搭建路由 - 图书页
router.get("/books", async (req, res) => {
  res.send(`
    <h1>图书页面</h1>
    <a href="/books/123">跳转到图书详情</a>
  `);
});

// 搭建路由 - 图书详情页
router.get("/books/:id", async (req, res) => {
  res.send(`
    <h1>图书详情页面</h1>
  `);
});

module.exports = router;
