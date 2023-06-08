const { WebSocketServer } = require("ws");

// 创建 web socket 服务器
// 连接方式：ws://127.0.0.1:4000
const wss = new WebSocketServer({ port: 4000 });

// 监听客户端连接上 web socket 服务器事件，得到客户端对象
// 在 nodejs 绑定事件一般都是 on(事件名称, 事件回调函数)
wss.on("connection", (ws) => {
  // ws 就是连接上 web socket 服务器的客户端对象
  // 接受ws客户端发送的消息（绑定接受消息的事件，将来客户端发送消息，就会触发这个事件）
  ws.on("message", (data) => {
    // 接受到客户端消息是Buffer数据
    console.log("服务器接受到客户端消息", data.toString());
    // 自己给自己发
    // ws.send(data.toString());

    // 获取所有连接上的客户端，给他们集体发送消息
    wss.clients.forEach((ws) => {
      ws.send(data.toString());
    });
  });
});
