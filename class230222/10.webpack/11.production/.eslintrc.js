// npm init @eslint/config 通过这个指令来生成这个文件
module.exports = {
  // 代码运行环境（运行在哪个平台）
  env: {
    browser: true, // 运行在浏览器
    es2021: true,
  },
  // 继承 airbnb 团队 eslint 风格
  extends: "airbnb-base",
  parserOptions: {
    ecmaVersion: "latest", // es最新版本
    sourceType: "module", // es6模块化规范
  },
  rules: {
    // "no-alert": "error",
    // 默认是单引号，改成双引号
    quotes: ["error", "double"],
    "import/no-extraneous-dependencies": "off",
  },
};
