function request() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000");
  xhr.send();
  xhr.onload = function () {
    console.log(xhr);
  };
}

// 默认暴露：只暴露一个内容
export default request;
