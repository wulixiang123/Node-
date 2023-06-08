function add(x, y) {
  return x + y;
}

const person = {
  name: "jack",
  age: 18,
};

const test = "test";

// 暴露
exports.add = add;
exports.person = person;

// ES6对象简写
// exports = {
//   add,
//   person,
// };

// module.exports = {
//   add,
//   person,
// };

// module.exports.add = add;
// module.exports.person = person;
