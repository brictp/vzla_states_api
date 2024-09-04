import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectString = process.env.DB_STRING;
const connectDB = async () => {
  try {
    await mongoose.connect(connectString, {
      autoIndex: true,
    });
    console.log("connection successful");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
