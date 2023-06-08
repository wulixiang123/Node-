const _ = require("lodash");

const person = _.cloneDeep({ name: "jack" });

console.log(person);

/*
  npm仓库地址：https://www.npmjs.com/

  package.json依赖包的版本有三种写法：
    ^4.18.7 大版本是固定的，中版本和小版本可以升级
    ~4.18.7 大版本和中版本是固定的，小版本可以升级
    4.18.7  大版本中版本和小版本都是固定的

  配置scripts命令
    "scripts": {
      "start": "npm run dev", // npm start (只有start指令可以不加run，其他都要加run)
      "dev": "node index.js" // npm run dev
    },
*/
