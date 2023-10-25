const User = require("../api/models/user");
module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.auth = false;

    socket.on("authenticate", async (auth) => {
      const { email, password } = auth;

      //find user

      const user = await User.findOne({ email }).exec();

      if (user === null) {
        socket.emit("error", { message: "No email found" });
      } else if (user.password !== password) {
        socket.emit("error", { message: "Wrong password" });
      } else {
        socket.auth = true;
        socket.user = user;
      }
    });

    // setTimeout(() => {
    //   // If the authentication failed, disconnect socket
    //   if (!socket.auth) {
    //     console.log("Unauthorized: Disconnecting socket ", socket.id);
    //     return socket.disconnect("unauthorized");
    //   }
    //   return socket.emit("authorized");
    // }, 1000);
  });
};
