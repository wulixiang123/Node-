type Arr = [string, number]; // 数组只有两个值(必须有)，第一个值类型为string，第二个值类型为number

const arr: Arr = ["hello", 123];

// arr[2] = 123; // 报错

// 元组允许越界（越界元素必须符合上述类型联合类型）
arr.push("ts");
arr.push(456);
// arr.push(true); // 报错
