import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/vzla_api");
    console.log('connection successful');
  } catch (err) {
    console.log(err)
  }
}

export default connectDB;