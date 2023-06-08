// 1. 将联合类型断言成其中某个类型
function fn1(x: string | number) {
  (x as string).split("");
}

// 2. 将父类断言成子类
class ApiError extends Error {
  code: number = 200;
}

function fn2(err: Error) {
  console.log((err as ApiError).code);
}

// 3. 将类型断言成any类型使用
(window as any).aaa = 111;

// 不合理
// const person = {
//   name: "jack",
// };
// (person as any).age = 18;

// 合理
const person = {
  name: "jack",
  age: 0,
};
person.age = 18;

const a: any = 123;
a.split("2");
a.filter(() => {});

// 4. 将 unknown 类型断言成具体类型
let b: unknown = 123;
b = "string";
(b as string).split("e");
