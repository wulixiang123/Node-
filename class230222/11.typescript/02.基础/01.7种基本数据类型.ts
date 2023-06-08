/*
  7 种基本数据类型
    string number boolean null undefined symbol bigint
*/

let str: string = "hello";
str = 123; // 报错，不能将类型“number”分配给类型“string”

let num: number = 123456;
num++;
num = 456;
num = true; // 报错

let bool: boolean = true;
bool = false;

let n: null = null;
n = undefined; // 报错
num = undefined; // 报错
num = null; // 报错

let u: undefined = undefined;

let s: symbol = Symbol();

let b: bigint = 1000n;
b = 123456; // 报错：不能将类型“number”分配给类型“bigint”