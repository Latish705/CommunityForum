import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
