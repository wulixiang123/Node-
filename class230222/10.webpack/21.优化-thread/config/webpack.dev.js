/*
  需要下载依赖
    pnpm add webpack webpack-cli style-loader css-loader less less-loader eslint-webpack-plugin
    babel-loader @babel/core @babel/preset-env html-webpack-plugin webpack-dev-server -D
*/
const os = require("os");
const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const threads = os.cpus().length - 1;

module.exports = {
  // 相对相对是运行指令的目录：如果我在 12.复习dev环境 目录下运行指令，相对路径相对的就是这个目录
  entry: "./src/app.js",
  output: {
    // 开发模式，不会有任何输出的（在内存中编译打包）
    path: undefined,
    filename: "js/built.js",
  },
  module: {
    rules: [
      // 处理样式文件：css、less
      {
        // 只会命中一个
        oneOf: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          // 处理图片
          {
            test: /\.(png|jpe?g|gif)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 10kb
              },
            },
            generator: {
              filename: "images/[hash:8][ext][query]",
            },
          },
          // 处理其他资源（字体图标）
          {
            test: /\.(ttf|woff2?|mp4)$/,
            type: "asset/resource",
            generator: {
              filename: "media/[hash:8][ext][query]",
            },
          },
          // 将es6+编译成es5-
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              "thread-loader",
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                  cacheDirectory: true, // 开启缓存
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    // 代码语法/风格检查
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      // lintDirtyModulesOnly: true, // 只对内容修改了的文件进行 lint，启动时跳过 lint
      cache: true, // 开启缓存
      cacheLocation: path.resolve(
        // 缓存目录
        __dirname,
        "../node_modules/.cache/eslint-webpack-plugin/.eslintcache",
      ),
      threads,
    }),
    // 创建html文件：1. 内容和原文件一致 2. 自动引入打包生成资源
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    // 开启 hot module replacement(HMR) 热模块替换
    // 浏览器只更新需要更新的代码（不做整体的刷新）
    hot: true, // css文件可以了，js需要手动处理
  },
  devtool: "cheap-module-source-map", // 行
};
