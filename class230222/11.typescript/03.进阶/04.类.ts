// 定义类（包括类型）
class Person {
  // 定义属性的类型
  public readonly name: string; // public可以省略不写
  private age: number;
  // 属性：实例对象直接属性
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  protected bbb = 111; // 实例对象上直接属性

  setBbb = () => {}; // 实例对象上直接方法

  // 方法：实例对象原型上的方法
  setAge(age: number) {
    this.age = age;
    // 一般来说，没有返回值就不定义返回值类型
  }

  // 静态属性：类的属性（不是实例对象的）
  static aaa: number = 123;
  // 静态方法：类的方法
  static setAaa(aaa: number) {
    console.log(aaa);
  }

  private _sex: number;
  // 属性定义getter和setter(get和set)
  get sex() {
    return this._sex;
  }
  set sex(val: number) {
    this._sex = val;
  }
}

const p = new Person("jack", 18);
console.log(p.name);
// p.name = "hello";
// console.log(p.age); // 报错，私有属性不能在外部访问
// console.log(p.bbb); // 报错，受保护属性不能在外部访问

// 类继承
class Son extends Person {
  sayName() {
    console.log(this.name);
    // console.log(this.age); // 报错，私有属性不能在外部访问
    console.log(this.bbb); // 可以访问
  }
}

// const p1: Person = {
//   name: "rose",
//   age: 18,
//   sex: 1,
//   _sex: 1,
//   bbb: 123,
//   setAge() {},
//   setBbb() {},
// };
