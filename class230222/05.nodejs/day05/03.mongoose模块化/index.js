// 默认去db目录找index文件，所以index可以省略不写
const db = require("./db"); // 引入模块，加载模块的所有代码：连接数据库

const Users = require("./db/models/users");

(async () => {
  await db;
  const users = await Users.find();
  console.log(users);
})()
