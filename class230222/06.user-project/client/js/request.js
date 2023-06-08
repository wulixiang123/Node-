const CancelToken = axios.CancelToken;

const errorMessages = {
  404: "找不到",
  401: "未登录",
  407: "登录过期",
  500: "服务器错误",
};

const requestsMap = new Map();

const addRequestKey = (config) => {
  const key = `${config.method} ${config.url} ${JSON.stringify(
    config.params
  )} ${JSON.stringify(config.data)} ${JSON.stringify(config.headers)}`;
  let cancel;
  config.cancelToken = new CancelToken((c) => {
    cancel = c;
  });

  requestsMap.set(key, cancel);
};

const removeRequestKey = (config) => {
  const key = `${config.method} ${config.url} ${JSON.stringify(
    config.params
  )} ${JSON.stringify(config.data)} ${JSON.stringify(config.headers)}`;

  const cancel = requestsMap.get(key);

  if (cancel) {
    cancel();
    requestsMap.delete(key);
  }
};

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  removeRequestKey(config);
  addRequestKey(config);

  // if (token) {
  //   config.headers.token = token;
  // }

  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    removeRequestKey(response.config);
    // 功能成功才返回数据
    if (response.data.code === 200) {
      return response.data.data;
    }
    // 功能失败，改成失败Promise，并返回失败原因
    return Promise.reject(response.data.message);
  },
  (error) => {
    // 如果取消请求了，会命中后面响应拦截器失败回调，此时没有error.config
    error.config && removeRequestKey(error.config);

    // if (error.config) {
    //   removeRequestKey(error.config);
    // }

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
