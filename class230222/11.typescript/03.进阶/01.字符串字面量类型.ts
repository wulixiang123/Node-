type Day =
  | "星期一"
  | "星期二"
  | "星期三"
  | "星期四"
  | "星期五"
  | "星期六"
  | "星期日";

let day: Day = "星期一";

// day = "hello kitty"; // 报错

day = "星期二";

type Sex = "男" | "女";

type Sex1 = 0 | 1;

let sex: Sex1 = 0;
sex = 1;
// sex = 2; // 报错
