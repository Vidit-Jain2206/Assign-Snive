import { CHAT } from "../models/chat.js";
import { MESSAGES } from "../models/message.js";
import { isValidObjectId } from "mongoose";
import { USER } from "../models/user.js";

export const createMessage = async (req, res) => {
  try {
    const { sender, content, chatId } = req.body;
    console.log(sender, content, chatId);
    if (!sender || !chatId || !content) {
      throw new Error("Required Fields Missing");
    }
    let newMessage = await MESSAGES.create({ sender, content, chatId });
    if (!newMessage) {
      throw new Error("Message Not Created");
    }
    newMessage = await newMessage.populate("sender", "username");
    newMessage = await newMessage.populate("chatId");
    newMessage = await USER.populate(newMessage, {
      path: "chatId.users",
      select: "username",
    });
    res.status(201).json({ newMessage, message: "Message Created" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      throw new Error("Required Fields Missing");
    }
    if (!isValidObjectId(chatId)) {
      throw new Error("Invalid Chat Id");
    }

    const isChatExist = await CHAT.findById(chatId);
    if (!isChatExist) {
      throw new Error("Chat Not Found");
    }

    const messages = await MESSAGES.find({ chatId });
    res
      .status(200)
      .json({ messages, message: "All messages fetched successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
