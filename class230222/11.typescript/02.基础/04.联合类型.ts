/*
  联合类型：
    1. 语法：
      string | number | boolean
    2. 特点
      作为变量的类型
        看最近一次赋值情况，就能使用赋值类型的方法/属性了
      作为函数参数的类型
        默认只能用联合类型的公共的方法/属性
        想使用某个类型的方法/属性，需要使用类型断言
*/

// let a: string | number | boolean = 123;
// a = "hello";
// a = true;

// a.split("e");

let b: string | number = 123;
b = "hello";
b = 123; // 最近一个赋值的内容，就可以使用赋值类型的方法了

b.split("e");
b.includes("e");

function fn(x: string | number) {
  console.log(x);
  // 联合类型作为参数使用时，访问数据的方法，只能访问（多个类型之间的）公共方法
  // x.split("e"); // 报错（只有string才有这个方法）
  x.toString(); // OK, 因为number和string都有这个方法

  (x as string).split("e"); // 联合类型要使用其中某个类型的独有方法，可以用类型断言
}

fn(1);
fn("1");
