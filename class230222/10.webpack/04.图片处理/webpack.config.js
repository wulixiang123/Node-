const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "built.js",
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
      },
    ],
  },
  plugins: [],
  mode: "development",
};
