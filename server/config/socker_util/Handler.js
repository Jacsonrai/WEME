function Handler(socket) {
  this.socket = socket;
  if (typeof Handler.clientsMap == "undefined") {
    Handler.clientsMap = new Map();
  }
  if (typeof Handler.chatPairMap == "undefined") {
    Handler.chatPairMap = new Map();
  }
  if (typeof Handler.waitingList == "undefined") {
    Handler.waitingList = [];
  }
}

Handler.prototype.registerUserHandler = function (userInfo) {
  const { user_id } = userInfo;
  const userSocketId = this.socket.id;
  Handler.clientsMap.set(userSocketId, user_id);
  console.log("clientMap", Handler.clientsMap);
};

Handler.prototype.createChatHandler = function () {
  console.log("finding...");

  if (Handler.clientsMap.get(this.socket.id) != null) {
    if (
      Handler.waitingList.length == 0 ||
      Handler.waitingList.includes(this.socket.id)
    ) {
      console.log(" found...");
      Handler.waitingList.push(this.socket.id);
      this.socket.emit("createChat", {
        code: 201,
        message: "please wait before we let you connect to user",
      });
    } else {
      console.log("couldnt found...");
      const otherClient = Handler.waitingList[0];
      Handler.waitingList.splice(0);
      Handler.chatPairMap.set(this.socket.id, otherClient);
      Handler.chatPairMap.set(otherClient, this.socket.id);

      this.socket.emit("createChat", {
        code: 202,
        message: "connected",
        userName: Handler.clientsMap.get(otherClient),
      });
      this.socket.broadcast.to(otherClient).emit("createChat", {
        code: 202,
        message: "connected",
        userName: Handler.clientsMap.get(this.socket.id),
      });
    }
  } else {
    console.log("not registerwd...");
    this.socket.emit("error", { code: 404, message: "user not registerd" });
  }
};
Handler.prototype.chatHandler = function (message) {
  console.log(Handler.chatPairMap, "chatpair");
  console.log(this.socket.id, "socektId");
  const otherClient = Handler.chatPairMap.get(this.socket.id);

  console.log(otherClient, "other");
  if (otherClient != null) {
    this.socket.broadcast.to(otherClient).emit("chat", {
      code: 202,
      message: message,
    });
  } else {
    this.socket.emit("chat", {
      code: 201,
      message: "user left",
    });
    Handler.chatPairMap.delete(this.socket.id);
  }
};

// Handler.prototype.disconnectHandler = function () {
//   console.log("disconnected ", this.socket.id);
//   Handler.clientsMap.delete(this.socket.id);
//   const otherClient = Handler.chatPairMap.get(this.socket.id);

//   if (otherClient != null) {
//     this.socket.broadcast.to(otherClient).emit("chat", {
//       code: 201,
//       message: "user left",
//     });
//     Handler.chatPairMap.delete(otherClient);
//   }
//   Handler.chatPairMap.delete(this.socket.id);
// };
Handler.prototype.disconnectHandler = function () {
  console.log("disconnected ", this.socket.id);
  const userSocketId = this.socket.id;
  Handler.clientsMap.delete(userSocketId);
  const otherClient = Handler.chatPairMap.get(userSocketId);

  if (otherClient != null) {
    this.socket.broadcast.to(otherClient).emit("chat", {
      code: 201,
      message: "user left",
    });

    // Update otherClient's socket ID in chatPairMap if they reconnect
    // Handler.chatPairMap.set(otherClient, newSocketId);

    // Update userSocketId's key in chatPairMap to the new socket ID
    // Handler.chatPairMap.set(newSocketId, otherClient);

    // Delete the old socket IDs from chatPairMap
    Handler.chatPairMap.delete(userSocketId);
    Handler.chatPairMap.delete(otherClient);
  }
};

module.exports = Handler;
