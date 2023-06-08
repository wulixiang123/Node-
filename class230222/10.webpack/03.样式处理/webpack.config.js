// webpack 配置文件
const path = require("path"); // nodejs核心模块，不需要下载

/*  
  运行指令：npx webpack

  开发模式：让代码能运行即可

  生产模式：优化代码（压缩、兼容性处理等）

  错误：Module not found: Error: Can't resolve 'style-loader'
  错误原因：没有下载包
    pnpm add style-loader -D
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
    rules: [
      // https://webpack.docschina.org/loaders
      // 处理css文件
      // pnpm add style-loader css-loader -D
      {
        test: /\.css$/,
        use: [
          // use数组的loader执行顺序：从下到上，从右到左
          "style-loader", // 将 js 模块中代表样式模块，会创建style标签，设置样式模块的内容
          "css-loader", // 将 css 文件编译成 js 模块（会使用commonjs语法）
        ],
      },
      // 处理less文件
      // pnpm add less-loader less -D
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader", // 将 less 文件编译成 css 文件
        ],
      },
      // 处理sass文件
      // pnpm add sass-loader sass -D
      {
        test: /\.s[a|c]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader", // 将 sass 文件编译成 css 文件
        ],
      },
    ],
  },
  // 4. plugins 插件
  plugins: [],
  // 5. mode 模式
  mode: "development", // development production
};
