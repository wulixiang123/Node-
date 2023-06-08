/*
  开发模式需要下载依赖
    pnpm add webpack webpack-cli style-loader css-loader less less-loader eslint-webpack-plugin
    babel-loader @babel/core @babel/preset-env html-webpack-plugin webpack-dev-server -D
  生产模式需要下载依赖
    pnpm add mini-css-extract-plugin postcss postcss-loader postcss-preset-env
    css-minimizer-webpack-plugin terser-webpack-plugin -D
*/
const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 2.1. 下载&引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取js中css成单独css文件
// 4.1. 下载&引入插件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); // 压缩css
// 5.1. 下载&引入插件
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 压缩js

module.exports = {
  entry: "./src/app.js",
  output: {
    // 1.1. 生产模式要有输出，所以需要指定输出目录
    path: path.resolve(__dirname, "../dist"),
    filename: "js/built.js",
    // 1.2. 每次打包需要将上次内容清空
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            // 2.2. 配置插件loader
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              // 3.1. 解决css兼容性问题
              // 3.2. 在package.json中配置browserslist，指示兼容性怎么做
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env"],
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              // "style-loader", // 动态创建style标签，插入js中css代码
              MiniCssExtractPlugin.loader, // 提取js中css成单独css文件
              "css-loader", // 将css编译到js中
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env"],
                  },
                },
              },
              "less-loader", // 将less编译css
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
            generator: {
              filename: "images/[hash:8][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?|mp4)$/,
            type: "asset/resource",
            generator: {
              filename: "media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({
      // 限定检查js的范围，只检查src下面
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 2.3. 使用插件
    new MiniCssExtractPlugin({
      // 2.4. 修改css文件输出路径
      filename: "css/built.css",
    }),
  ],
  // 1.3. 改模式为生产模式
  mode: "production",
  // 1.4. 建立行列提示
  devtool: "source-map",
  // 4.2. 使用压缩css
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      // 5.2. 压缩js
      new TerserWebpackPlugin({
      }),
    ],
  },
};
