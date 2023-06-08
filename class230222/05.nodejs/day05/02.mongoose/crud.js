const mongoose = require("mongoose");

(async () => {
  try {
    // 连接数据库
    await mongoose.connect("mongodb://127.0.0.1:27017/mongoose_test");
    console.log("数据库连接成功");
    // 创建集合
    const Users = mongoose.model("Users", {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      nickname: {
        type: String,
        default: "游客",
      },
      sex: {
        type: Number,
        default: 1, // 1代表男 0代表女
      },
      hobby: {
        type: [String],
        default: [],
      },
      info: {
        type: mongoose.SchemaTypes.Mixed, // 混合类型（任意类型）
        default: "",
      },
    });
    /*
      通过集合可以对文档进行CRUD操作
        过去所有方法支持两种用法
          回调函数的形式
          Promise的形式
        现在只支持Promise的形式

        C - create - 增
          增加一条数据
            Model.create({})
          增加多条数据
            Model.insertMany([])

        R - read - 查
          查询一条数据
            Model.findOne(查询条件, 过滤字段条件)
          查询多条数据
            Model.find(查询条件, 过滤字段条件)
        
        U - update - 改
          修改一条数据
            Model.updateOne(查询条件, 要修改的内容)
          修改多条数据
            Model.updateMany(查询条件, 要修改的内容)

        D - delete - 删
          删除一条数据
            Model.deleteOne(查询条件)
          删除多条数据
            Model.deleteMany(查询条件)
    */

    // 删除
    // await Users.deleteOne({ _id: "6454bcebfc10c4bfb66b8897" });
    await Users.deleteMany();
    const users = await Users.find();
    console.log(users);

    // 修改
    // await Users.updateOne(
    //   { username: "meiyangyang" },
    //   { hobby: ["灰太狼", "喜羊羊"] }
    // );

    // console.log("修改成功");

    // const user = await Users.findOne({ username: "meiyangyang" }); // 查询第一条
    // console.log(user);

    // await Users.updateMany({}, { sex: 0 });
    // const users = await Users.find();
    // console.log(users);

    // 查询
    // const user = await Users.findOne(); // 查询第一条
    // console.log(user);
    // const user = await Users.findOne({ username: "jack" }); // 找到返回相应文档对象，没有找到null
    // const user = await Users.findOne({ nickname: "admin" });
    // console.log(user);
    // if (user) {} // 判断是否找到数据

    // const users = await Users.find(); // 查询所有数据
    // console.log(users);
    // const users = await Users.find({ nickname: "admin", username: "admin" });
    // console.log(users);

    // const users = await Users.find({ nickname: "admin3333" }); // 找没找到都返回[]
    // console.log(users);
    // if (users.length) {} // 判断是否找到数据

    // const users = await Users.find({}, { __v: 0, sex: 0, hobby: 0, info: 0 }); // 查询所有数据
    // const users = await Users.find({}, { _id: 1, username: 1, password: 1, nickname: 1 }); // 查询所有数据
    // console.log(users);

    // 创建
    // await Users.create({
    //   username: "admin22",
    //   password: "admin",
    //   nickname: "admin",
    // });

    // await Users.insertMany([
    //   {
    //     username: "jack",
    //     password: "jack123",
    //     info: "我是jack",
    //     hobby: ["rose", "美羊羊"],
    //   },
    //   {
    //     username: "meiyangyang",
    //     password: "myy123",
    //     info: "我只是一只羊",
    //     hobby: ["灰太狼"],
    //   },
    // ]);

    // console.log("创建成功");
  } catch (err) {
    console.log(err);
  }
})();
