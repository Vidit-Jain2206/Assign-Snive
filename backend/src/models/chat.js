import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const chatSchema = new Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

export const CHAT = model("chats", chatSchema);
