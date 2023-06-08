window.onload = function () {
  // 放大镜功能
  magnifier();
  function magnifier() {
    // 1. 鼠标移入中图区域，显示遮罩层（蒙版），鼠标移出中图区域，隐藏遮罩层（蒙版）
    // var middleAreaEl = document.querySelector(".smallArea"); // 中图区域
    // var maskEl = document.querySelector(".mask"); // 遮罩层（蒙版）

    /*
    mouseenter / mouseleave 只对绑定元素生效
    mouseover / mouseout 对绑定元素及其子元素都生效

    css性能比js更好，能用css实现就用css实现
  */
    // middleAreaEl.onmouseenter = function () {
    //   maskEl.style.display = "block";
    // };
    // middleAreaEl.onmouseleave = function () {
    //   maskEl.style.display = "none";
    // };

    /*
      3. 鼠标在中图区域移动时，遮罩层（蒙版）跟着一起移动
        计算遮罩层（蒙版）位置：top、left
        top = e.offsetY - 遮罩层高度一半
        left = e.offsetX - 遮罩层宽度一半
    */

    var middleAreaEl = document.querySelector(".smallArea"); // 中图区域
    var maskEl = document.querySelector(".mask"); // 遮罩层（蒙版）
    var bigImgEl = document.querySelector(".bigArea img"); // 大图

    var maskElWidth = 300; // 遮罩层宽度
    var maskElHeight = 300; // 遮罩层高度

    var maskElHalfHeight = maskElWidth / 2; // 遮罩层高度一半
    var maskElHalfWidth = maskElHeight / 2; // 遮罩层宽度一半

    var middleAreaElWidth = 400; // 中图区域宽度
    var middleAreaElHeight = 400; // 中图区域高度

    middleAreaEl.onmousemove = function (e) {
      // 性能更差：读取DOM元素的宽高会导致页面重排重绘，性能不好
      // var top = e.offsetY - maskEl.clientHeight / 2;
      // var left = e.offsetX - maskEl.clientWidth / 2;
      // 性能更好：将宽高缓存一下，然后使用
      var top = e.offsetY - maskElHalfHeight;
      var left = e.offsetX - maskElHalfWidth;

      // 4. 遮罩层（蒙版）移动范围为整个中图区域
      if (top < 0) top = 0;
      else if (top > middleAreaElHeight - maskElHeight) {
        top = middleAreaElHeight - maskElHeight;
      }

      if (left < 0) left = 0;
      else if (left > middleAreaElWidth - maskElWidth) {
        left = middleAreaElWidth - maskElWidth;
      }

      maskEl.style.top = top + "px";
      maskEl.style.left = left + "px";

      /*
      5. 鼠标在中图区域移动时，大图也要跟着一起移动

        mask大小 / 中图区域大小 = 大图区域大小 / 大图大小

        300 / 400 = 600 / x
        x = 800

        mask / 大图区域 = 1 / 2
        中图大小 / 大图大小 = 1 / 2

        得出结论：大图运动距离是小图的两倍，大图运动是负值
    */
      bigImgEl.style.top = -2 * top + "px";
      bigImgEl.style.left = -2 * left + "px";
    };
  }

  // 轮播图功能
  carousel();
  function carousel() {
    var carouselImgElList = document.querySelectorAll(".swiper-slide img");
    var mImgEl = document.querySelector(".smallArea img");
    var lImgEl = document.querySelector(".bigArea img");

    // 之前高亮图片的下标
    var prevActiveImgIndex = 0;

    // 让第一张图片高亮
    carouselImgElList[prevActiveImgIndex].className = "active";

    /*
      1. this指向：
        普通函数：
          - 函数直接调用（fn()）, this指向window
          - 函数通过对象去调用（obj.fn()）, this指向调用的对象
          - new调用函数，this指向生成实例对象
          - 函数通过call/apply方法调用，this指向call/apply方法传入的第一个参数

        特殊函数：
          箭头函数：和调用无关，this指向外部函数this
          回调函数：
            DOM事件回调函数：this指向绑定事件的DOM元素
            定时器回调函数：this指向window

      2. 闭包:
        - 概念
          通过Chrome开发者调试工具查看可知，闭包是一个特殊容器（Closure 特殊对象）。
            特殊容器保存在内部函数中
            特殊容器保存内部函数引用外部函数的局部变量
            
        - 产生条件
          函数嵌套
          内部函数引用外部函数的局部变量
          调用外部函数

          当内部函数定义执行完时，才产生闭包

        - 优点/缺点
          优点：
            延长局部变量生命周期（让局部变量活的久点）
            让函数外部可以操作函数内部的局部变量数据
          缺点：
            可能会导致内存泄漏（解决：及时释放，让内部函数成为垃圾对象）

        - 生命周期（产生和死亡）
          产生：当内部函数定义执行完时，才产生闭包
          死亡: 当内部函数成为垃圾对象（内部函数死，闭包跟着一起死）
    */

    carouselImgElList.forEach(function (carouselImgEl, index) {
      carouselImgEl.onmouseenter = function () {
        // 2. 鼠标移入图片，当前图片高亮效果（边框），其他图片没有
        // 排他：将其他的元素className清空
        // carouselImgElList.forEach(function (carouselImgEl) {
        //   carouselImgEl.className = "";
        // });
        // 将上一个className清空
        carouselImgElList[prevActiveImgIndex].className = "";
        // dom事件回调函数的this指向：指向绑定事件的元素
        this.className = "active";

        prevActiveImgIndex = index;

        // http://127.0.0.1:5500/02.pc/pc/images/s1.png
        var arr = this.src.split("/"); // ['http:', '', '127.0.0.1:5500', '02.pc', 'pc', 'images', 's1.png']
        var imgName = arr.pop(); // 's1.png'
        var imgPrefix = arr.join("/"); // http://127.0.0.1:5500/02.pc/pc/images
        var mImgName = imgName.replace("s", "m"); // 'm1.png'
        var lImgName = imgName.replace("s", "l"); // 'l1.png'
        var mImgSrc = imgPrefix + "/" + mImgName; // http://127.0.0.1:5500/02.pc/pc/images/m1.png
        var lImgSrc = imgPrefix + "/" + lImgName; // http://127.0.0.1:5500/02.pc/pc/images/l1.png

        mImgEl.src = mImgSrc;
        lImgEl.src = lImgSrc;
      };
    });

    new Swiper(".swiper", {
      // 左右翻页箭头
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 5, // 每页显示几张图片
      slidesPerGroup: 5, // 多少张图片视为1组，每次轮播会轮播一组图片
    });
  }

  // 商品数据头部展示
  goodsHeaderShow();
  function goodsHeaderShow() {
    var goodsAreaEl = document.querySelector(".priceArea");

    var goodsDetail = goodsData.goodsDetail;

    var htmlStr =
      '\
        <h3 class="title">\
        ' +
      goodsDetail.title +
      '\
      </h3>\
      <p class="con1">\
        ' +
      goodsDetail.recommend +
      '\
      </p>\
      <div class="price">\
        <div class="priceDetail">\
          <p>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</p>\
          <p>￥ <span>' +
      goodsDetail.price +
      '</span> 元</p>\
        </div>\
        <div class="buy">\
          <p>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</p>\
          <p>\
            <span>' +
      goodsDetail.promoteSales.type +
      "</span\
            >" +
      goodsDetail.promoteSales.content +
      '\
          </p>\
        </div>\
      </div>\
      <div class="support">\
        <div class="supportDetail">\
          <p>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</p>\
          <p>' +
      goodsDetail.support +
      '</p>\
        </div>\
        <div class="address">\
          <p>配&nbsp;送&nbsp;至</p>\
          <p>' +
      goodsDetail.address +
      "</p>\
        </div>\
      </div>\
    ";

    goodsAreaEl.innerHTML = htmlStr;
  }

  // 商品销售属性数据展示
  goodsSaleAttrShow();
  function goodsSaleAttrShow() {
    var saleAttrEl = document.querySelector(".chooseArea");
    var addCartBtnEl = document.querySelector(".addCart");
    var crumbData = goodsData.goodsDetail.crumbData;

    // 1. 数据展示
    // 对销售属性列表遍历
    crumbData.forEach(function (saleAttr) {
      // saleAttr 单个销售属性
      var dlEl = document.createElement("dl");
      // dt内容设置完成，添加到dl中
      var dtEl = document.createElement("dt");
      dtEl.innerText = saleAttr.title;
      dlEl.appendChild(dtEl);

      saleAttr.data.forEach(function (saleAttrValue) {
        var ddEl = document.createElement("dd");
        ddEl.innerText = saleAttrValue.type;
        dlEl.appendChild(ddEl);
      });

      saleAttrEl.appendChild(dlEl);
    });

    // 2. 让销售属性值第一个高亮
    var dlElList = document.querySelectorAll(".chooseArea dl");

    dlElList.forEach(function (dlEl) {
      // var ddEl = dlEl.querySelector("dd"); // 只会找到第一个满足条件的元素
      // ddEl.className = "active";
      var ddElList = dlEl.querySelectorAll("dd");
      ddElList[0].className = "active"; // 找dl下面第一个dd, 让其高亮

      // 3. 点击销售属性，当前高亮，其他不高亮
      ddElList.forEach(function (ddEl) {
        ddEl.onclick = function () {
          // 排他
          ddElList.forEach(function (ddEl) {
            ddEl.className = "";
          });
          // 让自己高亮
          this.className = "active";
        };
      });
    });

    // 4. 点击按钮，输出选中的销售属性内容
    addCartBtnEl.onclick = function () {
      var saleAttrList = []; // [{ saleAttrName: '选择颜色', saleAttrValueName: '黑色' }]
      dlElList.forEach(function (dlEl) {
        var saleAttrName = dlEl.firstChild.innerText;
        var saleAttrValueName = dlEl.querySelector(".active").innerText;
        saleAttrList.push({
          saleAttrName: saleAttrName,
          saleAttrValueName: saleAttrValueName,
        });
      });
      console.log(saleAttrList);
    };
  }
};
