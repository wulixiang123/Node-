const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 相对路径相对的是什么？运行指令的目录
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 所有资源输出目录
    filename: "js/built.js", // 入口文件编译后输出的文件名
    clean: true, // 每次打包输出前，会将path目录下的内容清空，再输出
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[a|c]ss$/,
        // 如果使用loader，使用其默认配置，直接写 loader 字符串（loader名称）即可
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // https://webpack.docschina.org/guides/asset-modules/
        test: /\.(png|jpe?g|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 10kb以下的图片资源，会转base64
            // 优化：图片转base64，减少图片请求数量
            // 一旦图片转base64，体积会变得更大。所以一般只有小图才会转base64
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          // 图片输出名称
          // [hash] 哈希值，图片名称 074d0a396683fe286b42
          // [hash:8] 哈希值取8位
          // [ext] 扩展名 png/jpeg/gif
          // [query] 参数
          filename: "images/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|map3|map4|avi|wav)$/,
        type: "asset/resource",
        generator: {
          filename: "media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        // 排除 node_modules 下面的文件
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // 将es6+语法编译成es5-语法
            presets: ["@babel/preset-env"],
            // plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 以某个文件为模板创建新的html文件（新html文件结构和原来一样）
      // 新html文件自动引入打包输出的资源（js\css）
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  mode: "development",
  // 开发服务器 - 自动化（监视文件变化，自动打开浏览器，自动打包，自动刷新）
  // pnpm add webpack-dev-server -D
  // 一旦想要使用开发服务器，运行指令就要发生变化：npx webpack serve
  // 特点：在内存中编译打包的，没有任何输出
  devServer: {
    // host: "localhost",
    port: 3000,
    open: true, // 自动打开浏览器
  },
  // 生成 map 文件
  // map文件内部会建立源代码和打包后代码的一一映射关系
  // 将来打包后代码报错，找到map文件，通过map文件分析打包后代码对应源代码的错误位置，
  // 从而提示源代码出错的信息
  // devtool: "source-map", // 行和列(速度慢) -> 生产模式
  devtool: "cheap-module-source-map", // 行(速度快) -> 开发模式
};
