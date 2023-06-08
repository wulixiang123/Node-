/*
  用来连接MongoDB数据库模块
*/

const mongoose = require("mongoose");
// 连接数据库
module.exports = mongoose.connect("mongodb://127.0.0.1:27017/mongoose_test");
