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

  3. 需求三
    - 发送请求有公共参数
    - 返回响应需要统一处理
      - 成功得到成功的数据
      - 失败提示具体失败原因

    try {
      const res = await axios.post('/login', {
        username: 'admin123',
        password: 'sad212323sad'
      })
      // 请求成功
      if (res.data.code === 200) {
        // 功能成功
        console.log(res.data.data);
      } else {
        // 功能失败
        console.log(res.data.message);
      }
    } catch (e) {
      // 请求失败
      console.log(e)
    }

    希望：
      try {
        const data = await request.post('/login', {
          username: 'admin123',
          password: 'sad212323sad'
        })
        // 功能成功
        console.log(data)
      } catch (e) {
        // 请求失败 或 功能失败
        console.log(e)
      }
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

/*
  之前使用request发送请求，直接发送请求，请求完成修改返回值promise对象的状态

  现在，使用拦截器，再使用request发送请求
    先触发请求拦截器设置的回调函数（发送请求之前触发）
    再发送请求
    等响应回来，再触发响应拦截器设置的回调函数（得到响应之后触发）
    再触发后面流程
*/

// 请求拦截器
request.interceptors.request.use(
  // 成功回调函数
  // 发送请求是将请求方式、请求地址、请求参数等数据合并成一个对象，就是config
  (config) => {
    // 发送请求有公共参数(携带公共请求参数)
    // config.headers.token = "xxxxxxxx";
    // config.params.xxx = "xxxxxxxx";
    // config.data.xxx = "xxxxxxxx";
    // 必须返回config
    return config;
  }
  // 失败回调函数
  // () => {}
);

// 响应拦截器
request.interceptors.response.use(
  // 成功回调函数（status >= 200 && status < 300）
  (response) => {
    /*
      response: {
        config: {} // 请求配置项 
        headers: {}, // 响应头
        status: 200 // 响应状态码
        data: { // 响应体数据 response.data
          code: 200,
          message: null,
          success: true,
          data: xxx // response.data.data
        }, 
      }
    */
    // 例如：用户名和密码正确，功能成功
    if (response.data.code === 200) {
      // 功能成功, 返回成功的数据
      return response.data.data;
    }
    // 功能失败，返回失败的原因
    // 例如：用户名或密码错误，功能失败
    return Promise.reject(response.data.message);
  },
  // 失败回调函数
  (error) => {
    return Promise.reject(error.message);
  }
);
