# day03

## 删除用户功能

### 1. 搭建静态结构

```html
<!-- 删除用户对话框 -->
<div
  class="modal fade"
  id="removeUserModal"
  tabindex="-1"
  aria-labelledby="removeUserModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="removeUserModalLabel">删除用户</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <p>您确认要删除 <span class="remove-username"></span> 用户吗?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary remove-submit-btn">
          确定
        </button>
      </div>
    </div>
  </div>
</div>
```

### 2. 点击删除按钮显示对话框

```js
// data-bs-toggle="modal" data-bs-target="#removeUserModal"
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
      <button type="button" class="btn btn-danger remove-user-btn" data-bs-toggle="modal" data-bs-target="#removeUserModal">
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

### 3. 给删除按钮绑定事件，更新用户名和 id

1. 绑定自定义属性

```js
// data-username="${ user.username }" data-id="${user._id}"
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
      <button type="button" class="btn btn-danger remove-user-btn" data-bs-toggle="modal" data-bs-target="#removeUserModal" data-username="${
        user.username
      }" data-id="${user._id}">
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

2. 绑定点击事件

```js
// 需要定义在外面
const removeUserData = {
  id: "",
  // username: "",
};

// 定义在getUserList里面
const removeUserBtnListEl = document.querySelectorAll(".remove-user-btn");
const handleRemoveBtnClick = function () {
  const { id, username } = this.dataset; // 获取元素的自定义属性
  removeUserData.id = id;
  // updateUserData.username = username;
  document.querySelector(".remove-username").innerText = username;
};
removeUserBtnListEl.forEach((btnEl) => {
  btnEl.addEventListener("click", handleRemoveBtnClick);
});
```

### 4. 给确定按钮绑定事件，完成删除功能

```js
// 删除用户
const removeUser = () => {
  const removeSubmitBtnEl = document.querySelector(".remove-submit-btn");
  const removeUserModal = new bootstrap.Modal("#removeUserModal");

  removeSubmitBtnEl.onclick = async function () {
    try {
      await request({
        method: "DELETE",
        url: `/user/delete/${removeUserData.id}`,
      });

      alert("删除成功");

      removeUserModal.hide(); // 隐藏对话框

      getUserList(); // 重新数据展示
    } catch (e) {
      alert(e);
    }
  };
};
removeUser();
```
