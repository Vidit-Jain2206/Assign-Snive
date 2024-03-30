import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    content: {
      type: String,
      trim: true,
    },

    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
    },
  },
  { timestamps: true }
);

export const MESSAGES = mongoose.model("message", messageSchema);
