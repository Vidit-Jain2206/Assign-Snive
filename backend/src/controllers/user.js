import { USER } from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      throw new Error("Username Required");
    }
    const isUserExist = await USER.findOne({ username: username });
    if (isUserExist) {
      throw new Error("User Already Exist");
    }
    const user = await USER.create({ username });
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
