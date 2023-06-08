# Less

官网：https://less.devjs.cn/

1. 为什么要使用 Less？

- 开发中主题颜色到处要使用，它是十六进制表示的颜色，不好记。
- 主题色发生变化，一一修改，太麻烦了。
- 样式可复用的样式：边框、阴影、清除浮动等样式，复用更加灵活。
- ...

2. Less 是什么？

- Less 是 CSS 的预处理器，新的开发 CSS 模式，可以增强 CSS 功能
- Less 浏览器不能识别，需要借助工具编译成 CSS 才能运行

3. Less 如何使用

- 借助 less.js 文件，将 less 文件编译成 css 文件
- 借助 VSCode 插件 Easy Less，当你保存 Less 文件时，自动的将 Less 文件编译成 CSS 文件

## Less 使用

1. 变量

```less
// 定义变量
@primary-color: pink;

// 使用变量
.box {
  background-color: @primary-color;
}
```

2. 混合

```less
// 定义混合
.border (@position, @width: 1px) {
  border-@{position}: @width solid @border-color;
}

.box {
  // 使用混合
  .border(bottom);
}
```

3. 嵌套

```less
.box1 {
  width: 200px;
  height: 200px;
  .box2 {
    width: 100px;
    height: 100px;
  }
  // &代表当前父选择器
  &:hover {
    .box2 {
      background-color: pink;
    }
  }
}
```

4. 引入

```less
@import "./variable.less";
```
