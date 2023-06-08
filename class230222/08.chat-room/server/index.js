const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 4000 });

wss.on("connection", (ws) => {
  // 接受客户端的消息
  ws.on("message", (data) => {
    // 将客户端消息转发给所有客户端
    console.log(data.toString());

    wss.clients.forEach((ws) => {
      ws.send(data.toString());
    });
  });
});
