import { CHAT } from "../models/chat.js";
import mongoose, { isValidObjectId } from "mongoose";

export const createChat = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) {
      throw new Error("Required Fields Missing");
    }
    const payload = {
      users: [user._id],
    };
    let chat = await CHAT.create(payload);
    chat = await chat.populate("users");

    if (!chat) {
      throw new Error("Chat Not Created");
    }
    return res.status(200).json({ chat, message: "Chat created Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const joinChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { user } = req.body;
    if (!user || !chatId) {
      throw new Error("Required Fields Missing");
    }

    const isChatExist = await CHAT.findById(chatId);
    if (!isChatExist) {
      throw new Error("Chat Not Found");
    }
    const payload = {
      users: [...isChatExist.users, user._id],
    };
    let chat = await CHAT.findByIdAndUpdate(chatId, payload, { new: true });
    chat = await chat.populate("users");
    if (!chat) {
      throw new Error("Chat Not Created");
    }
    return res.status(200).json({ chat, message: "Chat joined successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      throw new Error("Chatid is required");
    }
    const isChatExist = await CHAT.findById(chatId).populate("users");
    if (!isChatExist) {
      throw new Error("Chat Not Found");
    }
    return res.status(200).json({ chat: isChatExist, message: "Chat found" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
