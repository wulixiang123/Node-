// 1. 下载mongoose
// 2. 引入mongoose
const mongoose = require("mongoose");

(async () => {
  try {
    // 3. 连接数据库(异步操作)
    // 如果数据库不存在会自动创建，如果希望真正保留下来至少要添加一条文档数据
    /*
      mongodb://localhost:27017/mongoose_test
        mongoose_test 要连接的数据库
    */
    await mongoose.connect("mongodb://127.0.0.1:27017/mongoose_test");
    console.log("数据库连接成功了");
    // 4. 创建集合collection（模型对象model）
    /*
      mongoose.model(集合名称, 集合对文档约束条件)
    */
    const Persons = mongoose.model("Persons", {
      // https://mongoosejs.com/docs/schematypes.html
      name: {
        type: String,
        required: true, // 必须项
        unique: true, // 唯一的
      },
      age: Number,
      sex: {
        // 可选属性
        type: Number, // 类型
        default: 1, // 默认值
      },
    });

    // 5. 创建文档对象document
    const person = new Persons({
      name: "jack",
      age: 18,
      sex: 0,
    });

    // 6. 将创建的文档对象给保存起来
    await person.save();
  } catch (err) {
    console.log("数据库连接失败了", err);
  }
})();
