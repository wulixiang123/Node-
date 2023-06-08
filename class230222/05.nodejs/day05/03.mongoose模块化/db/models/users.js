const mongoose = require("mongoose");
// 创建集合
const Users = mongoose.model("Users", {
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
    default: "游客",
  },
  sex: {
    type: Number,
    default: 1, // 1代表男 0代表女
  },
  hobby: {
    type: [String],
    default: [],
  },
  info: {
    type: mongoose.SchemaTypes.Mixed, // 混合类型（任意类型）
    default: "",
  },
});

module.exports = Users;
