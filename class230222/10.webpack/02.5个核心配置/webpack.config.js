// webpack 配置文件
const path = require("path"); // nodejs核心模块，不需要下载

/*  
  运行指令：npx webpack

  开发模式：让代码能运行即可

  生产模式：优化代码（压缩、兼容性处理等）
*/

module.exports = {
  // 配置对象（属性名是固定的）
  // 5个核心配置
  // 1. entry 入口
  entry: "./src/app.js", // 建议使用相对路径
  // 2. output 输出
  output: {
    // path.resolve 返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"), // 输出的目录，建议使用绝对路径
    filename: "built.js", // 输出文件名
  },
  // 3. loader 加载器
  module: {
    rules: [],
  },
  // 4. plugins 插件
  plugins: [],
  // 5. mode 模式
  mode: "production", // development production
};
