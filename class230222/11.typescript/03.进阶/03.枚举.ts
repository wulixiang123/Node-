enum Day1 {
  星期一 = 1,
  星期二 = 2,
  星期三 = 3,
  星期四 = 4,
  星期五 = 5,
  星期六 = 6,
  星期日 = 7,
}

type Day2 =
  | "星期一"
  | "星期二"
  | "星期三"
  | "星期四"
  | "星期五"
  | "星期六"
  | "星期日";

console.log(Day1.星期一); // 1
console.log(Day1[1]); // 星期一

enum Sex1 {
  男,
  女,
}

type Sex2 = "男" | "女";

type Sex3 = 1 | 0;

enum Sex4 {
  男 = 1,
  女 = 0,
}

// Sex4[0] // 女
// Sex4[1] // 男

// Sex4.男 // 1
// Sex4.女 // 0
