/*
  泛型: 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
*/

// function createArr(value: number, length: number): number[];
// function createArr(value: string, length: number): string[];
// function createArr(value: any, length: number): any[] {
//   const arr: any[] = [];
//   for (let i = 0; i < length; i++) {
//     arr.push(value);
//   }
//   return arr;
// }

// const arr1 = createArr(111, 10);
// const arr2 = createArr("hello", 10);

// <T> 定义泛型参数：T
// value: T 使用泛型参数
// T[] 使用泛型参数
// 将泛型参数T是什么类型，value的类型就是什么，返回值数组中值的类型也是什么
function createArr<T>(value: T, length: number): T[] {
  const arr: T[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(value);
  }
  return arr;
}

// 给泛型参数T赋予类型：number
const arr1 = createArr<number>(123, 10);
const arr2 = createArr<string>("hello", 10);

// 泛型参数可以定义n个
function fn1<T, U, K>() {}
fn1<string, number, boolean>();

// 泛型参数约束条件
interface Person {
  name: string;
  age: number;
}

// 普通泛型参数：可以传递任意类型
// K extends Person , K 必须要满足 Person 定义（只能多，不能少）
function fn2<T, U, K extends Person>() {}
fn2<
  string,
  number[],
  {
    name: string;
    age: number;
    sex: string; // 只能多，不能少
  }
>();

// 泛型参数默认值
function fn3<T, U = number>() {}
fn3<string>();

// 接口使用泛型
interface Animals<T> {
  name: string;
  info: T;
}

const dog: Animals<string> = {
  name: "金毛",
  info: "吊毛",
};

// 类使用泛型
class Person1<T> {
  name: T;
}

new Person1<string>();
