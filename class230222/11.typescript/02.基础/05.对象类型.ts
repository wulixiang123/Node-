// 接口：用来定义对象类型
// 类型一般首字母大写
// 定义了一个叫做 Person1 的对象类型
// 对象形状：有一个name属性，值string类型，还有age属性，值为number类型
interface Person1 {
  name: string; // 必选属性
  age: number; // 必选属性
}

const p1: Person1 = {
  name: "jack",
  age: 18,
  // sex: "男", // 报错
};

interface Person2 {
  name: string; // 必选属性
  age: number; // 必选属性
  sex?: string; // 可选属性
  // sex: string | undefined; // 可选属性
}

const p2: Person2 = {
  name: "rose",
  age: 18,
  sex: "女",
};

interface Person3 {
  name: string; // 必选属性
  age: number; // 必选属性
  sex?: string; // 可选属性
  // sex: string | undefined; // 可选属性
  // [key: string | symbol]: string | number | undefined; // 任意属性（任意属性值的类型要满足前面所有属性值的类型）
  [propName: string | symbol]: any; // 任意属性（任意属性值的类型要满足前面所有属性值的类型）
}

const p3: Person3 = {
  name: "tom",
  age: 20,
  hobby: ["1", 1, false],
};

interface Person4 {
  readonly id: string; // 只读属性
  name: string; // 必选属性
  age: number; // 必选属性
  sex?: string; // 可选属性
  [propName: string]: any; // 任意属性
}

const p4: Person4 = {
  id: "123456",
  name: "jerry",
  age: 22,
};

p4.age++;
p4.name += "~";
// p4.id = "456789"; // 报错
