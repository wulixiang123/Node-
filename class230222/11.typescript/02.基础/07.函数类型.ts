/*  
  定义函数类型：
    1. 定义函数的参数类型 
      ()内部放参数和参数类型
    2. 定义函数的返回值类型
      ()右边放返回值类型
*/
// 函数声明
function fn1(x: number, y: number): number {
  return x + y;
}

// 类型推论得到的类型
// 函数表达式
const fn2 = function (x: number | string): void {};

// 箭头函数
const fn3 = (x: number | string): void => {};

fn1(1, 2);

// 自己定义类型
const fn4: (x: number | string) => void = function (x) {};

const fn5: (x: number | string) => void = (x) => {};

// 函数参数 - 必选参数

// 函数参数 - 可选参数(必须位于最后)
const fn6: (x: number, y?: number) => void = (x, y) => {};

// const fn7: (x?: number, y: number) => void = (x, y) => {}; // 报错

// 函数参数 - 默认值(这个参数是可选参数)
function fn7(x: number, y: number = 123): void {
  console.log(x, y);
}
fn7(1);
fn7(1, 2);

// 函数参数 - 剩下所有参数
function fn8(x: number, ...args: number[]): void {
  console.log(x, args);
}

// 函数重载
// 123 -> 321
// '123' -> '321'
function reverse(value: string): string;
function reverse(value: number): number;
function reverse(value: string | number): string | number {
  if (typeof value === "string") {
    return value.split("").reverse().join("");
  } else {
    return Number(String(value).split("").reverse().join(""));
  }
}

const str = reverse("123");
const num = reverse(123);

// 用接口来定义函数类型(一般不用)
interface Fn {
  (x: number, y?: number): void;
}
