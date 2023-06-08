/*
  需求5：取消重复请求
    1. 如何判断该请求是重复的？

      每次发送请求判断，这个请求是不是存过了
        存过了，请求就重复了，取消第一个（需要第二个）,第二个也要存起来
        没有存过，不是重复的，将其存起来

      如何判断该请求是重复的
        看请求方式、请求地址、请求参数、请求头如果是一样的，说明请求重复

      在哪里存储请求？请求拦截器

      为了防止内存泄漏：请求完成需要删除


    2. 如何取消请求？
      CancelToken
*/
const CancelToken = axios.CancelToken;

const errorMessages = {
  404: "找不到",
  500: "服务器错误",
};

// 用来存储请求
// key: 代表请求的唯一标识 -> 请求方式、请求地址、请求参数、请求头等信息生成的
// value: 取消请求的方法（每一个请求都有唯一的取消方法）
const requestsMap = {};

const request = axios.create({
  baseURL: "http://localhost:3000", // 公共请求地址
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 定义 key：每个请求都要生成自己的唯一的标识
    // 相同请求生成标识相同，不同请求生成的标识是不同的
    /*
      只要对象数据必须转JSON，如果不转：
        { aaa: 111 } -> [object Object]  { bbb: 222 } -> [object Object]
    */
    const key = `${config.method} ${config.url} ${JSON.stringify(
      config.params
    )} ${JSON.stringify(config.data)} ${JSON.stringify(config.headers)}`;

    // 定义value：取消请求方法
    let cancel; // 定义变量，能在外面使用取消请求的方法
    config.cancelToken = new CancelToken((c) => {
      cancel = c; // c 就是取消请求的方法
    });

    if (requestsMap[key]) {
      // 说明请求重复了，将上一个请求取消
      const cancel = requestsMap[key]; // 获取上一个请求的cancel方法
      cancel(); // 将上一个请求取消
      delete requestsMap[key]; // 删除之前存的上一个请求
    }

    requestsMap[key] = cancel;
    // 将来添加公共请求参数
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { config } = response;
    const key = `${config.method} ${config.url} ${JSON.stringify(
      config.params
    )} ${JSON.stringify(config.data)} ${JSON.stringify(config.headers)}`;
    requestsMap.delete(key);
    // 功能成功才返回数据
    if (response.data.code === 200) {
      return response.data.data;
    }
    // 功能失败，改成失败Promise，并返回失败原因
    return Promise.reject(response.data.message);
  },
  (error) => {
    const config = error.config;
    if (config) {
      // 取消请求，在请求拦截器就被删除了，响应拦截器不需要删了
      const key = `${config.method} ${config.url} ${JSON.stringify(
        config.params
      )} ${JSON.stringify(config.data)} ${JSON.stringify(config.headers)}`;
      requestsMap.delete(key);
    }

    let message = "未知错误，请联系管理员解决";

    if (error.message.includes("Network Error")) {
      message = "网络连接失败";
    } else if (error.message.includes("timeout")) {
      message = "网络超时";
    }

    if (error.response) {
      message = errorMessages[error.response.status];
    }

    return Promise.reject(message);
  }
);
