// number[]: 代表数组，数组里面的值是number类型
const arr1: number[] = [];
arr1.push(1);
arr1.push(122);
// arr1.push("str"); // 报错
// arr1.push(false); // 报错

// Array<number>: 代表数组，数组里面的值是number类型
const arr2: Array<number> = [];
arr2.push(1);
arr2.push(122);
// arr2.push("str"); // 报错
// arr2.push(false); // 报错

const arr3: (number | string | boolean)[] = [];
arr3.push(1);
arr3.push("str");
arr3.push(false);

const arr4: Array<number | string | boolean> = [];
arr4.push(1);
arr4.push("str");
arr4.push(false);

// 接口定义数组类型（一般不用的）
interface Arr {
  [index: number]: number;
}

const arr5: Arr = [1, 2, 3];
arr5[1] = 456; // 可以使用属性
// arr5.push(66); // 不能使用方法

// 接口定义伪数组
interface Args {
  [index: number]: number;
  length: number;
  callee: Function;
}

function fn1() {
  const args: Args = arguments;
  console.log(args);
}

function fn2() {
  // IArguments 内置类型，直接可以使用
  const args: IArguments = arguments;
  console.log(args);
}
