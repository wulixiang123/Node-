// 分别暴露：可以暴露多个内容
export const count = (x, y) => {
  return x - y;
};

export const add = (x, y) => {
  return x + y;
};

// 模块内容默认对外不可见的，如果不暴露的话，外面不能使用
const mul = (x, y) => {
  return x * y;
};
