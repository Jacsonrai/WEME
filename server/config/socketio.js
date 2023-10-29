const User = require("../api/models/user");
const Handler = require("./socker_util/Handler");
module.exports = function (io) {
  io.on("connection", (client) => {
    const handler = new Handler(client);
    client.on("registerUser", (userInfo) =>
      handler.registerUserHandler(userInfo)
    );

    client.on("createChat", () => handler.createChatHandler());
    client.on("chat", (message) => handler.chatHandler(message));
    client.on("disconnect", () => handler.disconnectHandler());
    client.on("endChat", () => handler.disconnectHandler());
    console.log("client " + client.id + "connected");
  });
};
