const express = require("express");
const cors = require("cors");
const routes = require("../api/routes/v1");
const http = require("http");

// const config = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };
// const signaler = new SignalingChannel();
// const pc = new RTCPeerConnection(config);

const app = express();
//parse body params and attache them to req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//enable CORS- Cross Origin Resource Sharing
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
//creating http server for socket.io
const server = http.createServer(app);
//establing socket.io connection
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
  maxHttpBufferSize: 1e8, // 100 MB we can upload to server (By Default = 1MB)
  pingTimeout: 60000, // increate the ping timeout
  cors: {
    origin: "*",
  },
});
require("./socketio.js")(io);
// io.on("connection", (socket) => {
//   // console.log("Client connected");
//   socket.on("message", (message) => {
//     io.emit("message", message);
//   });
//   socket.on("disconnect", () => {
//     console.log("Client disconnect");
//   });
// });

//mount api v1 routes
app.use("/v1", routes);

module.exports = server;
