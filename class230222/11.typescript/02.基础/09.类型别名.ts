// 类型别名：给类型取一个新的名称

// 基本类型
type Num = number;

const n: Num = 123;
type Str = string;
type Bool = boolean;
type N = null;
type U = undefined;
type sym = symbol;
type big = bigint;

// 引用类型
type Person = {
  readonly id: string;
  name: string;
  age: number;
  sex?: string;
};

type Arr = number[];

type Func = (x: number) => void;

// 联合类型
type NumberOrString = number | string;

/*
  type 和 interface 有什么区别？
    1. interface 只能定义引用类型，而 type 可以定义所有类型
    2. interface 通过 extends 继承，而 type 通过 & （交叉类型）来继承
    3. interface 主要用来定义对象类型，而 type 用来定义数组类型
*/

type A = {
  name: string;
};

type B = {
  age: number;
};

type C = A & B; // 交叉类型(只能用于引用类型)：必须都有

const obj1: C = {
  name: "jack",
  age: 18,
};

type D = A | B; // 联合类型（可以用于任意类型）：有其中一个或都有都行

const obj2: D = {
  name: "jack",
  age: 18,
};

interface Person1 {
  name: string;
}

interface Person2 {
  age: number;
}

interface Person3 extends Person1, Person2 {}

const obj3: Person3 = {
  name: "jack",
  age: 18,
};
