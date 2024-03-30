import axios from "axios";

export const createChat = async (user) => {
  const data = await axios.post("/api/v1/chat", { user });
  return data;
};

export const joinChat = async ({ chatId, user }) => {
  const data = await axios.patch(`/api/v1/chat/${chatId}`, { user });
  return data;
};

export const getChatById = async (chatId) => {
  const data = await axios.get(`/api/v1/chat/${chatId}`);
  return data;
};
