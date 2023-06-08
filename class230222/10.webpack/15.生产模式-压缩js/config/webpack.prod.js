const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/built.js",
    clean: true,
  },
  module: {
    rules: [
      // 处理样式文件：css、less
      {
        test: /\.css$/,
        use: [
          // "style-loader", // 创建style标签，将js中css代码放入
          MiniCssExtractPlugin.loader, // 将位于js中css代码，提取成单独css文件
          "css-loader",
          // pnpm add postcss postcss-loader postcss-preset-env -D
          // 样式兼容性需要在package.json中配置browserslist才能完成：
          // browserslist配置：https://gitee.com/mirrors_lukeed/browserslist
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // plugins: [
                //   [
                //     "postcss-preset-env",
                //     {
                //       // 其他选项
                //     },
                //   ],
                // ],
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // plugins: [
                //   [
                //     "postcss-preset-env",
                //     {
                //       // 其他选项
                //     },
                //   ],
                // ],
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "less-loader",
        ],
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
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    // 代码语法/风格检查
    new EslintWebpackPlugin(),
    // 创建html文件：1. 内容和原文件一致 2. 自动引入打包生成资源
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取js中css成单独文件
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
  ],
  mode: "production",
  devtool: "source-map", // 行列
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserPlugin(),
    ],
  },
};
