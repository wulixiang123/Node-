/*
  1. 需求一
    - 发送请求每个请求都要写服务器地址，太麻烦了
    - 服务器将来会发生变化（不同环境有不同的服务器：开发环境、测试环境、上线环境等）

    解决：
      axios.create({
        baseURL: 'http://localhost:3000'
      })

  2. 需求二
    - 开发的项目需要对接多个服务器

    解决：
      const requestA = axios.create({
        baseURL: 'http://localhost:3000'
      })

      const requestB = axios.create({
        baseURL: 'http://localhost:4000'
      })
*/

// axios.create({}); 返回值就可以看做是一个axios，命名为request
// request的功能和axios几乎一样
const request = axios.create({
  // 基础路径（将来如果使用request发送请求，请求的url前面会默认加上baseURL）
  baseURL: "http://localhost:3000",
  // 请求头
  headers: {},
  // 超时时间（一旦请求时间超过10s，就会自动中断/取消请求）
  timeout: 10000,
});

// const requestXxx = axios.create({
//   // 基础路径（将来如果使用request发送请求，请求的url前面会默认加上baseURL）
//   baseURL: "http://localhost:4000",
//   // 请求头
//   headers: {},
//   // 超时时间（一旦请求时间超过10s，就会自动中断/取消请求）
//   timeout: 10000,
// });
