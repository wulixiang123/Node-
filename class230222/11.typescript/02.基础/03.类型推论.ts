/*
  类型推论：自动推论出类型

    基本数据类型，一般都不需要定义了，可以类型推论
    引用数据类型，类型推论的结果可能会存在问题
      如果引用数据类型为空，推论类型就是有问题的
      如果引用数据类型有部分数据，推论类型问题不大
*/

let a: number = 123;

let b = "string123";
// b = 123; // 报错

let c = true;

const arr = [];
arr.push(1); // 报错

const arr1 = [1];
arr1.push(2); // OK

const obj = {};
obj.name = "jack"; // 报错

const obj1 = { name: "rose" };
obj1.name = "jack"; // OK
obj1.age = 18; // 报错

let d; // 定义变量不赋值，推论为any类型（不太建议）
d = 123;
d = "string";
