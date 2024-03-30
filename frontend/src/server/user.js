import axios from "axios";
export const createUser = async (username) => {
  const data = await axios.post("/api/v1/user", { username });
  return data;
};
