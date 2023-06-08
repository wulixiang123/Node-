/*
  any 任意类型 (一般不建议使用)
  unknown 不知道类型
    any 和 unknown 的相同点：
      他们都可以随便的赋值
    any 和 unknown 的不同点：
      any会拥有所有数据类型的内容（方法）
      unknown不知道当前的类型，所以不能使用任何的类型内容（方法）
  void 空（一般用于函数，函数如果没有返回值，返回值类型就是void）
  never 代表从不存在的值（1. 报错 2. 死循环）
*/

let a: any = 123;
a = "string";
a = true;

// 实际使用会报错，但是类型不报错
a.split("i");
a.map();

function fn1(): void {}

const fn2 = function (): void {};

const fn3 = (): void => {};

let b: void = undefined;
b = null;

function error1(): never {
  throw new Error("出错了");
}

function error2(): never {
  while (true) {
    console.log("死循环");
  }
}

let c: unknown = 123;
c = "string";
c = true;
c.split("i");

// 想要unknown使用某个类型的方法，必须使用类型断言（未来讲）
(c as string).split("i");
(c as []).map(() => {});
