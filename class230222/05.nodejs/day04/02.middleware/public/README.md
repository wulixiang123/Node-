# pc

## 放大镜功能

1. 鼠标移入中图区域，显示遮罩层（蒙版），鼠标移出中图区域，隐藏遮罩层（蒙版）

```less
.smallArea {
  width: 400px;
  position: relative;
  &:hover {
    .mask {
      display: block;
    }
  }
}
```

2. 鼠标移入中图区域，显示大图区域，鼠标移出中图区域，隐藏大图区域

```less
.smallArea {
  width: 400px;
  position: relative;
  &:hover {
    .mask {
      display: block;
    }

    ~ .bigArea {
      display: block;
    }
  }
}
```

3. 鼠标在中图区域移动时，遮罩层（蒙版）跟着一起移动

```js
window.onload = function () {
  /*
    3. 鼠标在中图区域移动时，遮罩层（蒙版）跟着一起移动
      计算遮罩层（蒙版）位置：top、left
      top = e.offsetY - 遮罩层高度一半
      left = e.offsetX - 遮罩层宽度一半
  */
  var middleAreaEl = document.querySelector(".smallArea"); // 中图区域
  var maskEl = document.querySelector(".mask"); // 遮罩层（蒙版）

  var maskElWidth = 300; // 遮罩层宽度
  var maskElHeight = 300; // 遮罩层高度

  var maskElHalfHeight = maskElWidth / 2; // 遮罩层高度一半
  var maskElHalfWidth = maskElHeight / 2; // 遮罩层宽度一半

  middleAreaEl.onmousemove = function (e) {
    // 性能更差：读取DOM元素的宽高会导致页面重排重绘，性能不好
    // var top = e.offsetY - maskEl.clientHeight / 2;
    // var left = e.offsetX - maskEl.clientWidth / 2;
    // 性能更好：将宽高缓存一下，然后使用
    var top = e.offsetY - maskElHalfHeight;
    var left = e.offsetX - maskElHalfWidth;

    maskEl.style.top = top + "px";
    maskEl.style.left = left + "px";
  };
};
```

```less
.mask {
  width: 300px;
  height: 300px;
  background-color: rgba(255, 192, 203, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  // 解决移动时 mask 抖动问题
  // 让当前元素不能成为鼠标事件的 target。（不会响应鼠标事件）
  pointer-events: none;
}
```

4. 遮罩层（蒙版）移动范围为整个中图区域

```js
window.onload = function () {
  /*
    3. 鼠标在中图区域移动时，遮罩层（蒙版）跟着一起移动
      计算遮罩层（蒙版）位置：top、left
      top = e.offsetY - 遮罩层高度一半
      left = e.offsetX - 遮罩层宽度一半
  */
  var middleAreaEl = document.querySelector(".smallArea"); // 中图区域
  var maskEl = document.querySelector(".mask"); // 遮罩层（蒙版）

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
  };
};
```

5. 鼠标在中图区域移动时，大图也要跟着一起移动

```js
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
```

## 轮播图功能

准备工作，将功能封装到函数中：

- 隔离变量
- 更好维护代码

```js
window.onload = function () {
  // 放大镜功能
  magnifier();
  function magnifier() {
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
      var top = e.offsetY - maskElHalfHeight;
      var left = e.offsetX - maskElHalfWidth;

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

      bigImgEl.style.top = -2 * top + "px";
      bigImgEl.style.left = -2 * left + "px";
    };
  }

  // 轮播图功能
  carousel();
  function carousel() {
    // ...
  }
};
```

1. 轮播图功能：每页显示 5 张图片，每次轮播 5 张图片

- 引入 swiper 的 css 和 js
- 准备相应的 DOM 容器

```html
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="./images/s1.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s2.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s3.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s1.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s2.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s3.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s1.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s2.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s3.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s1.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s2.png" alt="" />
    </div>
    <div class="swiper-slide">
      <img src="./images/s3.png" alt="" />
    </div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

- 修改 swiper 样式

```less
.swiper {
  width: 400px;
  height: 56px;
  padding: 0 20px;
  img {
    width: 50px;
    height: 50px;
    display: block;
    margin: 0 10px;
  }

  .swiper-button-prev {
    left: 0;
    cursor: pointer;
    &::after {
      font-size: 16px;
      color: #999;
    }
  }

  .swiper-button-next {
    right: 0;
    cursor: pointer;
    &::after {
      font-size: 16px;
      color: #999;
    }
  }
}
```

- new Swiper 让轮播功能生效

```js
// 轮播图功能
carousel();
function carousel() {
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
```

2. 鼠标移入图片，当前图片高亮效果（边框），其他图片没有

```js
var carouselImgElList = document.querySelectorAll(".swiper-slide img");

// 之前高亮图片的下标
var prevActiveImgIndex = 0;

// 让第一张图片高亮
carouselImgElList[prevActiveImgIndex].className = "active";

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
  };
});
```

```less
img {
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 10px;
  &.active {
    border: 1px solid deeppink;
  }
}
```

3. 鼠标移入图片，中图和大图变成这张图片

将图片修改为 s1.png、m1.png、l1.png

```js
var mImgEl = document.querySelector(".smallArea img");
var lImgEl = document.querySelector(".bigArea img");

carouselImgElList.forEach(function (carouselImgEl, index) {
  carouselImgEl.onmouseenter = function () {
    // 2. 鼠标移入图片，当前图片高亮效果（边框），其他图片没有
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
```

## 商品详情功能

1. 商品详情头部数据展示

```js
// 商品数据展示
goodsShow();
function goodsShow() {
  var goodsAreaEl = document.querySelector(".priceArea");

  var goodsDetail = goodsData.goodsDetail; // 注意：需要修改data.js文件中的数据名称（goodData -> goodsData）

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
```

2. 商品详情销售属性数据展示

```js
// 商品销售属性数据展示
goodsSaleAttrShow();
function goodsSaleAttrShow() {
  var saleAttrEl = document.querySelector(".chooseArea");
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
}
```

3. 让销售属性值第一个高亮

```js
// 注意：要先展示销售属性数据，才能让其高亮
var dlElList = document.querySelectorAll(".chooseArea dl");

dlElList.forEach(function (dlEl) {
  // var ddEl = dlEl.querySelector("dd"); // 只会找到第一个满足条件的元素
  // ddEl.className = "active";
  var ddElList = dlEl.querySelectorAll("dd");
  ddElList[0].className = "active"; // 找dl下面第一个dd, 让其高亮
});
```

```css
dd.active {
  color: red;
}
```

4. 点击销售属性，当前高亮，其他不高亮

```js
var dlElList = document.querySelectorAll(".chooseArea dl");

dlElList.forEach(function (dlEl) {
  var ddElList = dlEl.querySelectorAll("dd");
  ddElList[0].className = "active";

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
```

5. 点击按钮，输出选中的销售属性内容

```js
var addCartBtnEl = document.querySelector(".addCart");

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
```
