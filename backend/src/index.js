import "dotenv/config";

import { app } from "./app.js";
import { connect } from "./db/connection.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { USER } from "./models/user.js";

const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
connect()
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

io.on("connection", async (socket) => {
  var userId = socket.handshake.query.userId;
  await USER.findByIdAndUpdate(userId, {
    status: true,
  });
  socket.on("setup", (user) => {
    socket.join(user._id);
    socket.emit("connected");
  });

  socket.on("new message", (msg) => {
    const chat = msg.chatId;
    chat.users.forEach((user) => {
      if (user._id === msg.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", msg);
    });
  });

  socket.on("join chat", (chat) => {
    socket.join(chat._id);
    chat.users.forEach((user) => {
      socket.in(user._id).emit("joined chat", chat);
    });
  });
  socket.on("start typing", ({ room, user }) =>
    socket.in(room).emit("start typing", user)
  );

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("disconnect", async () => {
    await USER.findByIdAndUpdate(userId, {
      status: false,
    });
  });
});
