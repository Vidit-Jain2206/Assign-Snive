import express from "express";
import { createMessage, getAllMessage } from "../controllers/message.js";

export const messageRouter = express.Router();

messageRouter.post("/", createMessage);
messageRouter.get("/:chatId", getAllMessage);
