/*
  开发模式需要下载依赖
    pnpm add webpack webpack-cli style-loader css-loader less less-loader eslint-webpack-plugin
    babel-loader @babel/core @babel/preset-env html-webpack-plugin webpack-dev-server -D
  生产模式需要下载依赖
    pnpm add mini-css-extract-plugin postcss postcss-loader postcss-preset-env
    css-minimizer-webpack-plugin terser-webpack-plugin -D
*/
const os = require("os");
const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 2.1. 下载&引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取js中css成单独css文件
// 4.1. 下载&引入插件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); // 压缩css
// 5.1. 下载&引入插件
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 压缩js

const threads = os.cpus().length - 1;

module.exports = {
  entry: "./src/app.js", // 单入口: 默认情况下，只会打包输出一个js文件
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].js", // [name] 以打包的文件的name命名
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
            use: [
              "thread-loader",
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                  cacheDirectory: true, // 开启缓存
                  plugins: ["@babel/plugin-transform-runtime"],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({
      // 限定检查js的范围，只检查src下面
      context: path.resolve(__dirname, "../src"),
      // lintDirtyModulesOnly: true, // 只对内容修改了的文件进行 lint，启动时跳过 lint
      cache: true, // 开启缓存
      cacheLocation: path.resolve(
        // 缓存目录
        __dirname,
        "../node_modules/.cache/eslint-webpack-plugin/.eslintcache"
      ),
      threads,
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
        parallel: true,
      }),
    ],
    // 代码分割
    splitChunks: {
      chunks: "all", // 所有模块都要处理
    },
    // splitChunks: {
    //   chunks: "all", // 所有模块都要处理
    //   minSize: 20000, // 最小多小的模块要被单独打包成一个文件
    //   minRemainingSize: 0, // 通过确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块
    //   minChunks: 1, // 这个模块至少要被引用几次
    //   maxAsyncRequests: 30, // 最大异步请求数量（生成script带async defer）
    //   maxInitialRequests: 30, // 一上来最多请求数量
    //   enforceSizeThreshold: 50000, // 一旦模块超过这个大小，就被强制代码分割
    //   cacheGroups: {
    //     vendors: { // node_modules中代码会被代码分割，分割形成的名字叫vendors
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //     },
    //     default: { // 其他模块至少被引用两次才会被单独打包，名字叫default
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
  },
};
