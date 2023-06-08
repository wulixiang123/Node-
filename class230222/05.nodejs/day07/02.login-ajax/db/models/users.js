const mongoose = require("mongoose");

// 集合的名称会自动变成小写和复数形式
module.exports = mongoose.model("users", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
