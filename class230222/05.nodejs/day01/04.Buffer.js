/*
  buffer 存储的数据大小 1 byte
  buffer数据在打印时转16进制显示
    二进制：0000 0000 - 1111 1111
    16进制：00 - ff
*/
const buf = Buffer.alloc(10);

console.log(buf);

buf[0] = 255;

console.log(buf);

const buf1 = Buffer.from("hello nodejs");
console.log(buf1);
console.log(buf1.toString());

const buf2 = Buffer.from("尚硅谷");
console.log(buf2);
