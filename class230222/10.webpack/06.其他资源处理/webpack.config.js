const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"), // 所有资源输出目录
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
    ],
  },
  plugins: [],
  mode: "development",
};
