// 等待所有资源加载完成才触发
window.onload = function () {
  let page = 1;
  let limit = 3;

  const updateUserData = {
    id: "",
    // username: "",
  };

  const removeUserData = {
    id: "",
    // username: "",
  };

  const getUserList = async () => {
    // 1. 获取用户列表数据
    const res = await request({
      // method: 'GET',
      url: `/user/${page}/${limit}`,
    });

    // console.log(res);

    // 2. 将用户列表数据展示（table）
    // 字符串拼串
    let htmlStr = "";
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
    // 将字符串设置成innerHTML生效
    const tbodyEl = document.querySelector(".table tbody");
    tbodyEl.innerHTML = htmlStr;

    // 3. 根据total，展示分页的页码
    // 计算分页总页数
    const totalPages = Math.ceil(res.total / limit);
    // 遍历生成页码
    // 左箭头
    let pageHtmlStr = `<li class="page-item">
      <a class="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>`;
    // 中间页码
    for (let index = 0; index < totalPages; index++) {
      pageHtmlStr += `<li class="page-item ${
        index + 1 === page ? "active" : ""
      }">
        <a class="page-link">${index + 1}</a>
      </li>`;
    }
    // 右箭头
    pageHtmlStr += `<li class="page-item">
      <a class="page-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>`;
    // 将字符串设置成innerHTML生效
    const paginationEl = document.querySelector(".pagination");
    paginationEl.innerHTML = pageHtmlStr;

    // 4. 完成分页器功能（点击页码，完成跳转）
    // 获取到的元素是伪数组，没有splice方法，所以需要转真数组
    const liListEl = Array.from(document.querySelectorAll(".page-item"));
    const prevEl = liListEl.splice(0, 1)[0];
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

    // 5. 给按钮绑定点击事件
    const updateUserBtnListEl = document.querySelectorAll(".update-user-btn");

    // console.log(updateUserBtnListEl);

    const handleUpdateBtnClick = function () {
      const { id, username } = this.dataset; // 获取元素的自定义属性
      updateUserData.id = id;
      // updateUserData.username = username;
      document.querySelector(".update-username").innerText = username;
    };
    updateUserBtnListEl.forEach((btnEl) => {
      btnEl.addEventListener("click", handleUpdateBtnClick);
    });

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
  };
  getUserList();

  // 添加用户
  const saveUser = () => {
    // 表单校验
    const formEl = document.querySelector(".needs-validation");

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

      // 判断表单是否校验通过，通过true，不通过false
      if (this.checkValidity()) {
        // 校验通过, 收集表单数据
        const username = usernameInputEl.value.trim();
        const password = passwordInputEl.value.trim();
        const nickname = nicknameInputEl.value.trim();

        console.log(username, password, nickname);
        // 发送请求，添加用户
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

          alert("添加用户成功");

          // 隐藏对话框
          saveUserModal.hide();

          // 发送请求，重新获取数据展示
          getUserList();
        } catch (e) {
          alert(e);
        }
      }
    });

    // 对话框隐藏事件
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
  };
  saveUser();

  // 修改用户
  const updateUser = () => {
    const formEl = document.querySelector(".update-user-form");

    const updatePasswordInputEl = document.querySelector(
      "#updatePasswordInput"
    );
    const updateNicknameInputEl = document.querySelector(
      "#updateNicknameInput"
    );

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
          // 隐藏对话框
          updateUserModal.hide();
          // 发送请求，重新获取数据展示
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
};
