interface PersonProps {
  name: string;
  age: number;
  setAge(age: number): void;
}

// 类继承类

// 类实现接口：规定类必须要按照接口的形状去定义
// Person 类型：{}
class Person implements PersonProps {
  // 类定义属性类型
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  setAge(age: number) {
    this.age = age;
  }

  // 更多的也行
  setName(name: string) {
    this.name = name;
  }
}

const p = new Person("jack", 18);
p.setAge(1);

// 接口继承接口
interface A {
  name: string;
}

interface B extends A {
  age: number;
}

const b: B = {
  name: "jack",
  age: 18,
};

// 接口继承类
interface C extends Person {}

const c: C = {
  name: "jack",
  age: 18,
  setName() {},
  setAge() {},
};
