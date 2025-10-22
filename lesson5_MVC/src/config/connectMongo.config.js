import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/lesson5_mvc");
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export default connectMongo;
