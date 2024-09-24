// utils/db.ts

import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URI) {
    return console.error("MISSING MONGODB_URL");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB Connection Failed!", error);
    throw new Error("MongoDB Connection Failed!");
  }
};

export default connectDB;
