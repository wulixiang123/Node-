const mongoose = require("mongoose");

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
  nickname: {
    type: String,
    required: true,
  },
  // 软删除
  deleted: {
    type: Boolean,
    default: false,
  },
});
