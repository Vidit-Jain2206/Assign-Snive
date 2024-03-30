import axios from "axios";

export const createMessage = async ({ user, newMessage, chatId }) => {
  const data = await axios.post("/api/v1/message", {
    sender: user._id,
    content: newMessage,
    chatId: chatId,
  });
  return data;
};
