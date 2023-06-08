# day02

## 1. 用户列表数据基本展示

1. 引入相关的 js

- axios.min.js
- request.js
- user.js

```html
<script src="./js/axios.min.js"></script>
<!-- 注意：token参数要注释掉，否则找不到会报错 -->
<script src="./js/request.js"></script>
<script src="./js/user.js"></script>
```

2. 发送请求，获取数据

```js
// 等待所有资源加载完成才触发
window.onload = function () {
  const getUserList = async () => {
    // 1. 获取用户列表数据
    const res = await request({
      // method: 'GET',
      url: `/user/1/3`,
    });

    console.log(res);
  };
  getUserList();
};
```

3. 将获取的数据进行展示

```js
// 等待所有资源加载完成才触发
window.onload = function () {
  const getUserList = async () => {
    // 1. 获取用户列表数据
    const res = await request({
      // method: 'GET',
      url: `/user/1/3`,
    });

    console.log(res);

    // 2. 将用户列表数据展示（table）
    // 字符串拼串
    let htmlStr = "";
    res.users.forEach((user, index) => {
      htmlStr += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${user.username}</td>
        <td>${user.nickname}</td>
        <td>
          <button type="button" class="btn btn-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            修改用户
          </button>
          <button type="button" class="btn btn-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
              />
            </svg>
            删除用户
          </button>
        </td>
      </tr>`;
    });
    // 将字符串设置成innerHTML生效
    const tbodyEl = document.querySelector(".table tbody");
    tbodyEl.innerHTML = htmlStr;
  };
  getUserList();
};
```

## 2. 用户列表数据分页展示

### 2.1. 分页器页码展示

1. 计算总页数

```js
// 计算分页总页数
const totalPages = Math.ceil(res.total / limit);
```

2. 遍历生成页码

```js
// 遍历生成页码
// 左箭头
let pageHtmlStr = `<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous">
    <span aria-hidden="true">&laquo;</span>
  </a>
</li>`;
// 中间页码
for (let index = 0; index < totalPages; index++) {
  pageHtmlStr += `<li class="page-item ${index + 1 === page ? "active" : ""}">
    <a class="page-link" href="#">${index + 1}</a>
  </li>`;
}
// 右箭头
pageHtmlStr += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next">
    <span aria-hidden="true">&raquo;</span>
  </a>
</li>`;
```

3. 添加到页面生效

```js
// 将字符串设置成innerHTML生效
const paginationEl = document.querySelector(".pagination");
paginationEl.innerHTML = pageHtmlStr;
```

4. 合并所有代码

```js
// 等待所有资源加载完成才触发
window.onload = function () {
  const getUserList = async () => {
    let page = 1;
    let limit = 3;

    // 1. 获取用户列表数据
    const res = await request({
      // method: 'GET',
      url: `/user/${page}/${limit}`,
    });

    console.log(res);

    // 2. 将用户列表数据展示（table）
    // 字符串拼串
    let htmlStr = "";
    res.users.forEach((user, index) => {
      htmlStr += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${user.username}</td>
        <td>${user.nickname}</td>
        <td>
          <button type="button" class="btn btn-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            修改用户
          </button>
          <button type="button" class="btn btn-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
              />
            </svg>
            删除用户
          </button>
        </td>
      </tr>`;
    });
    // 将字符串设置成innerHTML生效
    const tbodyEl = document.querySelector(".table tbody");
    tbodyEl.innerHTML = htmlStr;

    // 3. 根据total，展示分页的页码
    // 计算分页总页数
    const totalPages = Math.ceil(res.total / limit);
    // 遍历生成页码
    // 左箭头
    let pageHtmlStr = `<li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>`;
    // 中间页码
    for (let index = 0; index < totalPages; index++) {
      pageHtmlStr += `<li class="page-item ${
        index + 1 === page ? "active" : ""
      }">
        <a class="page-link" href="#">${index + 1}</a>
      </li>`;
    }
    // 右箭头
    pageHtmlStr += `<li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>`;
    // 将字符串设置成innerHTML生效
    const paginationEl = document.querySelector(".pagination");
    paginationEl.innerHTML = pageHtmlStr;
  };
  getUserList();
};
```

### 2.2. 分页器功能

1. page 和 limit 参数需要定义在函数外面

```js
let page = 1;
let limit = 3;

const getUserList = () => {};
```

2. 完成功能

```js
// 4. 完成分页器功能（点击页码，完成跳转）
// 获取到的元素是伪数组，没有splice方法，所以需要转真数组
const liListEl = Array.from(document.querySelectorAll(".page-item"));
const prevEl = liListEl.splice(0, 1)[0]; // splice方法返回值是数组，我们要取出其中的元素
const nextEl = liListEl.splice(liListEl.length - 1, 1)[0];

function handleClick() {
  // 更新页码
  page = +this.innerText;
  // 重新获取数据展示
  getUserList();
}
// 中间页码点击事件
liListEl.forEach((liEl) => {
  liEl.onclick = handleClick;
});
// 左右翻页点击事件
prevEl.onclick = function () {
  if (page > 1) {
    page--;
    getUserList();
  }
};
nextEl.onclick = function () {
  if (page < totalPages) {
    page++;
    getUserList();
  }
};
```

## 3. 添加用户功能

### 3.1. 添加用户对话框

文档: https://v5.bootcss.com/docs/components/modal/#live-demo

1. 搭建对话框结构

```html
<div
  class="modal fade"
  id="saveUserModal"
  tabindex="-1"
  aria-labelledby="saveUserModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="saveUserModalLabel">添加用户</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="usernameInput" class="form-label"> 用户名 </label>
          <input
            type="text"
            class="form-control"
            id="usernameInput"
            placeholder="请输入用户名"
          />
        </div>
        <div class="mb-3">
          <label for="passwordInput" class="form-label"> 密码 </label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="请输入密码"
          />
        </div>
        <div class="mb-3">
          <label for="nicknameInput" class="form-label"> 用户昵称 </label>
          <input
            type="text"
            class="form-control"
            id="nicknameInput"
            placeholder="请输入用户昵称"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary">保存</button>
      </div>
    </div>
  </div>
</div>
```

2. 点击按钮切换显示对话框

```html
<!-- 
  data-bs-toggle="modal"
  data-bs-target="#saveUserModal"
    可以控制对话框显示，注意id必须和对话框id对应上
 -->
<button
  type="button"
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#saveUserModal"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-plus-lg"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
    />
  </svg>
  添加用户
</button>
```

### 3.2. 表单校验功能

文档: https://v5.bootcss.com/docs/forms/validation/#custom-styles

1. 添加表单校验规则

```html
<!-- required 就是表单校验的规则，必填项 -->
<input
  type="text"
  class="form-control"
  id="usernameInput"
  placeholder="请输入用户名"
  required
/>

<!-- required 就是表单校验的规则，必填项 -->
<input
  type="password"
  class="form-control"
  id="passwordInput"
  placeholder="请输入密码"
  required
/>

<!-- required 就是表单校验的规则，必填项 -->
<input
  type="text"
  class="form-control"
  id="nicknameInput"
  placeholder="请输入用户昵称"
  required
/>
```

2. 添加表单校验失败的错误信息

```html
<!-- required 就是表单校验的规则，必填项 -->
<input
  type="text"
  class="form-control"
  id="usernameInput"
  placeholder="请输入用户名"
  required
/>
<!-- 表单校验失败提示的错误信息 -->
<div class="invalid-feedback">用户名不能为空</div>

<!-- required 就是表单校验的规则，必填项 -->
<input
  type="password"
  class="form-control"
  id="passwordInput"
  placeholder="请输入密码"
  required
/>
<!-- 表单校验失败提示的错误信息 -->
<div class="invalid-feedback">密码不能为空</div>

<!-- required 就是表单校验的规则，必填项 -->
<input
  type="text"
  class="form-control"
  id="nicknameInput"
  placeholder="请输入用户昵称"
  required
/>
<!-- 表单校验失败提示的错误信息 -->
<div class="invalid-feedback">用户昵称不能为空</div>
```

3. 添加 form 表单组件，将按钮改为 submit 用来提交表单

```html
<form class="needs-validation" novalidate>
  <div class="modal-body">
    <div class="mb-3">
      <label for="usernameInput" class="form-label"> 用户名 </label>
      <input
        type="text"
        class="form-control"
        id="usernameInput"
        placeholder="请输入用户名"
        required
      />
      <div class="invalid-feedback">用户名不能为空</div>
    </div>
    <div class="mb-3">
      <label for="passwordInput" class="form-label"> 密码 </label>
      <input
        type="password"
        class="form-control"
        id="passwordInput"
        placeholder="请输入密码"
        required
      />
      <div class="invalid-feedback">密码不能为空</div>
    </div>
    <div class="mb-3">
      <label for="nicknameInput" class="form-label"> 用户昵称 </label>
      <input
        type="text"
        class="form-control"
        id="nicknameInput"
        placeholder="请输入用户昵称"
        required
      />
      <div class="invalid-feedback">用户昵称不能为空</div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      取消
    </button>
    <!-- 按钮 type="submit" 用来提交表单 -->
    <button type="submit" class="btn btn-primary">保存</button>
  </div>
</form>
```

4. 给 form 表单绑定事件，阻止默认行为，并校验表单

```js
// 添加用户
function saveUser() {
  // 表单校验
  const formEl = document.querySelector(".needs-validation");

  formEl.addEventListener("submit", async function (e) {
    // 用来阻止默认行为（不刷新）
    e.preventDefault();
    // 让其具有表单校验功能
    this.classList.add("was-validated");
  });
}
saveUser();
```

### 3.3. 发送请求，添加用户

1. 完成基本功能

```js
// 获取对话框元素
// 文档: https://v5.bootcss.com/docs/components/modal/#methods
const saveUserModal = new bootstrap.Modal("#saveUserModal", {
  keyboard: false,
});

const usernameInputEl = document.getElementById("usernameInput");
const passwordInputEl = document.getElementById("passwordInput");
const nicknameInputEl = document.getElementById("nicknameInput");

formEl.addEventListener("submit", async function (e) {
  // 用来阻止默认行为（不刷新）
  e.preventDefault();
  // 让其具有表单校验功能
  this.classList.add("was-validated");

  // 1. 判断表单是否校验通过，通过true，不通过false
  if (this.checkValidity()) {
    // 2. 校验通过, 收集表单数据
    const username = usernameInputEl.value.trim();
    const password = passwordInputEl.value.trim();
    const nickname = nicknameInputEl.value.trim();
    // 3. 发送请求，添加用户
    try {
      await request({
        method: "POST",
        url: "/user/save",
        data: {
          username,
          password,
          nickname,
        },
      });
      // 4. 添加成功提示
      alert("添加用户成功");

      // 5. 隐藏对话框（这个元素需要通过特殊的方式获取）
      saveUserModal.hide();
    } catch (e) {
      // 4. 添加失败也要提示
      alert(e);
    }
  }
});
```

2. 隐藏时清除表单数据，清空表单校验信息

```js
// 对话框隐藏事件
// 文档: https://v5.bootcss.com/docs/components/modal/#events
document
  .getElementById("saveUserModal")
  .addEventListener("hidden.bs.modal", () => {
    // 清空数据
    usernameInputEl.value = "";
    passwordInputEl.value = "";
    nicknameInputEl.value = "";
    // 删除类名，就不会校验表单了
    formEl.classList.remove("was-validated");
  });
```

## 4. 修改用户功能

### 4.1. 修改用户对话框

1. 搭建对话框结构

```html
<!-- 修改用户对话框 -->
<div
  class="modal fade"
  id="updateUserModal"
  tabindex="-1"
  aria-labelledby="updateUserModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="updateUserModalLabel">修改用户</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">用户名</label>
          <p class="update-username">xxx</p>
        </div>
        <div class="mb-3">
          <label for="updatePasswordInput" class="form-label">密码</label>
          <input
            type="password"
            class="form-control"
            id="updatePasswordInput"
          />
        </div>
        <div class="mb-3">
          <label for="updateNicknameInput" class="form-label"> 用户昵称 </label>
          <input type="text" class="form-control" id="updateNicknameInput" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary">保存</button>
      </div>
    </div>
  </div>
</div>
```

2. 点击按钮切换显示对话框

```js
// 因为表格数据是 js 动态渲染的，所以要在 js 中来给修改按钮添加自定义属性
// data-bs-toggle="modal" data-bs-target="#updateUserModal"
res.users.forEach((user, index) => {
  htmlStr += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${user.username}</td>
    <td>${user.nickname}</td>
    <td>
      <button type="button" class="btn btn-warning update-user-btn" data-bs-toggle="modal" data-bs-target="#updateUserModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
        修改用户
      </button>
      <button type="button" class="btn btn-danger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash3"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
          />
        </svg>
        删除用户
      </button>
    </td>
  </tr>`;
});
```

### 4.2. 修改用户表单校验

1. 修改表单校验规则

```html
<input type="password" class="form-control" id="updatePasswordInput" required />

<input type="text" class="form-control" id="updateNicknameInput" required />
```

2. 修改表单校验失败的错误信息

```html
<input type="password" class="form-control" id="updatePasswordInput" required />
<div class="invalid-feedback">密码不能为空</div>

<input type="text" class="form-control" id="updateNicknameInput" required />
<div class="invalid-feedback">用户昵称不能为空</div>
```

3. 修改 form 表单组件，将按钮改为 submit 用来提交表单

```html
<!-- novalidate 用来阻止默认表单校验行为 -->
<form class="update-user-form" novalidate>
  <div class="modal-body">
    <div class="mb-3">
      <label class="form-label">用户名</label>
      <p class="update-username">xxx</p>
    </div>
    <div class="mb-3">
      <label for="updatePasswordInput" class="form-label"> 密码 </label>
      <input
        type="password"
        class="form-control"
        id="updatePasswordInput"
        required
      />
      <div class="invalid-feedback">密码不能为空</div>
    </div>
    <div class="mb-3">
      <label for="updateNicknameInput" class="form-label"> 用户昵称 </label>
      <input
        type="text"
        class="form-control"
        id="updateNicknameInput"
        required
      />
      <div class="invalid-feedback">用户昵称不能为空</div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      取消
    </button>
    <button type="submit" class="btn btn-primary">保存</button>
  </div>
</form>
```

4. 给 form 表单绑定事件，阻止默认行为，并校验表单

```js
// 修改用户
const updateUser = () => {
  const formEl = document.querySelector(".update-user-form");

  formEl.addEventListener("submit", async function (e) {
    e.preventDefault();
    // 一直累加类名
    // this.className += " was-validated";
    // 添加类名，一旦类名存在就不加了
    this.classList.add("was-validated");
  });
};
updateUser();
```

### 4.3. 点击修改按钮，显示用户 username 和得到用户 id

1. 给按钮绑定自定义属性

```js
// data-id="${ user._id }" data-username="${user.username}"
res.users.forEach((user, index) => {
  htmlStr += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${user.username}</td>
    <td>${user.nickname}</td>
    <td>
      <button type="button" class="btn btn-warning update-user-btn" data-bs-toggle="modal" data-bs-target="#updateUserModal" data-id="${
        user._id
      }" data-username="${user.username}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
        修改用户
      </button>
      <button type="button" class="btn btn-danger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash3"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
          />
        </svg>
        删除用户
      </button>
    </td>
  </tr>`;
});
```

2. 定义对象，用来接受 id

```js
// 一定要在外层，这样其他地方才能使用
const updateUserData = {
  id: "",
  // username: "",
};
```

3. 绑定事件，更新 username 和 id

```js
// 5. 给按钮绑定点击事件
const updateUserBtnListEl = document.querySelectorAll(".update-user-btn");

const handleUpdateBtnClick = function () {
  const { id, username } = this.dataset; // 获取元素的自定义属性
  updateUserData.id = id; // 更新 id
  document.querySelector(".update-username").innerText = username; // 更新 username
};
updateUserBtnListEl.forEach((btnEl) => {
  btnEl.addEventListener("click", handleUpdateBtnClick);
});
```

### 4.4. 发送请求，完成功能

```js
// 修改用户
const updateUser = () => {
  const formEl = document.querySelector(".update-user-form");

  const updatePasswordInputEl = document.querySelector("#updatePasswordInput");
  const updateNicknameInputEl = document.querySelector("#updateNicknameInput");

  const updateUserModal = new bootstrap.Modal(
    document.querySelector("#updateUserModal")
  );

  formEl.addEventListener("submit", async function (e) {
    e.preventDefault();
    // 一直累加类名
    // this.className += " was-validated";
    // 添加类名，一旦类名存在就不加了
    this.classList.add("was-validated");

    // 1. 表单校验是否通过
    if (this.checkValidity()) {
      // 2. 发送请求，修改数据
      const password = updatePasswordInputEl.value.trim();
      const nickname = updateNicknameInputEl.value.trim();

      try {
        await request({
          method: "PUT",
          url: "/user/update",
          data: {
            id: updateUserData.id,
            nickname,
            password,
          },
        });

        alert("修改成功");
        // 3. 隐藏对话框
        updateUserModal.hide();
        // 4. 发送请求，重新获取数据展示
        getUserList();
      } catch (e) {
        alert(e);
      }
    }
  });

  // 对话框隐藏事件
  document
    .getElementById("updateUserModal")
    .addEventListener("hidden.bs.modal", () => {
      // 清空数据
      updatePasswordInputEl.value = "";
      updateNicknameInputEl.value = "";
      // 删除类名，就不会校验表单了
      formEl.classList.remove("was-validated");
    });
};
updateUser();
```
