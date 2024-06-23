import { io } from "~/app";
let onLineUsers = [];
//v1
export const onConnect = (socket) => {
  socket.on("addNewUser", () => {
    onLineUsers.push({
      userId: socket.id,
      conversation: [
        {
          position: "end",
          message: "Chào bạn GearVN có thể giúp gì cho bạn ạ!",
        },
      ],
    });
    io.emit("getOnlineUsers", onLineUsers);
  });

  socket.on("disconnect", () => {
    onLineUsers = onLineUsers.filter((user) => user.userId !== socket.id);
    io.emit("getOnlineUsers", onLineUsers);
  });

  socket.on("sendMessage", (newMessage) => {
    const user = onLineUsers.find((user) => user.userId === newMessage.userId);
    if (user) {
      user.conversation.push({
        position: newMessage.position,
        message: newMessage.content,
      });
      //if position = end: io.to user id
      io.emit("getOnlineUsers", onLineUsers);
      io.to(user.userId).emit("receiveMessage", {
        position: newMessage.position,
        message: newMessage.content,
      });
      io.emit("receiveConversationAdmin", {
        userId: user.userId,
        conversation: user.conversation,
      });
    }
  });
  socket.on("getConversationAdmin", (id) => {
    const user = onLineUsers.find((user) => user.userId === id);
    if (user) {
      io.emit("receiveConversationAdmin", {
        userId: id,
        conversation: user.conversation,
      });
    }
  });
  io.emit("getOnlineUsers", onLineUsers);
};
