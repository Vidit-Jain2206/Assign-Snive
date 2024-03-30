import mongoose from "mongoose";

export const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    throw new Error(err.message);
    process.exit(1);
  }
};
