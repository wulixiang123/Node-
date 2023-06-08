window.onload = function () {
  let username = "";

  function handleUsername() {
    // 1. 用户名功能
    // 1.1. 点击确定，保存用户名
    const submitBtnEl = document.querySelector(".submit-btn");
    const updateBtnEl = document.querySelector(".update-btn");
    const usernameInputEl = document.querySelector(".username-input");
    const saveUserEl = document.querySelector(".save-user");
    const updateUserEl = document.querySelector(".update-user");
    const usernameEl = document.querySelector(".username");

    submitBtnEl.onclick = function () {
      const name = usernameInputEl.value.trim();
      if (!name) {
        alert("请输入用户名");
        return;
      }
      username = name;
      updateUserEl.style.display = "block";
      saveUserEl.style.display = "none";
      usernameEl.innerText = name;
    };
    // 1.2. 点击修改，修改用户名
    updateBtnEl.onclick = function () {
      updateUserEl.style.display = "none";
      saveUserEl.style.display = "block";
    };
  }
  handleUsername();

  function handleChat() {
    // 2. 连接上WebSocket服务器
    // 通过ipconfig可以查询ip：192.168.33.35
    const ws = new WebSocket("ws://127.0.0.1:4000");

    // 3. 发送消息
    const textareaEl = document.querySelector(".text");
    const btnEl = document.querySelector(".btn");
    const roomBodyEl = document.querySelector(".room-body");

    // 给按钮禁用效果
    textareaEl.oninput = function (e) {
      const value = this.value.trim();
      if (value) {
        btnEl.disabled = false;
      } else {
        btnEl.disabled = true;
      }
    };

    btnEl.onclick = function () {
      if (!username) {
        alert("请输入用户名");
        return;
      }
      /*
      消息：
        {
          username: 用户名,
          content: 消息内容,
          time: '2023-5-16 16:25:01'
        }
    */

      const time = getTime();
      const content = textareaEl.value.trim();
      ws.send(
        JSON.stringify({
          username,
          content,
          time,
        })
      );
      // 清空消息内容
      textareaEl.value = "";
      // 按钮禁用
      btnEl.disabled = true;
      // 将消息内容追加到room-body中
      roomBodyEl.innerHTML += `<div class="message-item my">
        <p class="message-header">我 ${time}</p>
        <div class="message-content-wrap">
          <span class="message-content">${content}</span>
        </div>
      </div>`;
      // 滚动条到最下
      roomBodyEl.scrollTop = roomBodyEl.scrollHeight;
    };

    function getTime() {
      const date = new Date();
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      // 时分秒要补零
      let h = date.getHours();
      h = h >= 10 ? h : "0" + h;
      let m = date.getMinutes();
      m = m >= 10 ? m : "0" + m;
      let s = date.getSeconds();
      s = s >= 10 ? s : "0" + s;

      return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }
    // 4. 接受消息
    ws.onmessage = function (e) {
      const data = JSON.parse(e.data);
      // 过滤掉自己发送的消息
      if (data.username === username) {
        return;
      }
      roomBodyEl.innerHTML += `<div class="message-item">
        <p class="message-header">${data.username} ${data.time}</p>
        <span class="message-content">${data.content}</span>
      </div>`;
      // 滚动条到最下
      roomBodyEl.scrollTop = roomBodyEl.scrollHeight;
    };
  }
  handleChat();

  // https://m.zfuhao.com/emoji
  const emojiArr = ["😀", "😁", "😂", "😃", "😄"];

  const emojiListEl = document.querySelector(".emoji-list");

  let htmlStr = "";

  emojiArr.forEach((emoji) => {
    htmlStr += `<span>${emoji}</span>`;
  });

  emojiListEl.innerHTML = htmlStr;

  // const emojiItemsEl = document.querySelectorAll(".emoji-list span");
  const textareaEl = document.querySelector(".text");

  // emojiItemsEl.forEach((emoji) => {
  //   emoji.onclick = function () {
  //     const emoji = this.innerText;
  //     textareaEl.value += emoji;
  //   };
  // });

  // 使用事件委托
  emojiListEl.onclick = function (e) {
    textareaEl.value += e.target.innerText;
  };
};
