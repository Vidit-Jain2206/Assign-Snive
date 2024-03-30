import express from "express";
import { createChat, getChatById, joinChat } from "../controllers/chat.js";

export const chatRouter = express.Router();

chatRouter.post("/", createChat);
chatRouter.patch("/:chatId", joinChat);
chatRouter.get("/:chatId", getChatById);
