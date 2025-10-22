import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nguyencuong21520:Menu00d1@nvc.bl27lke.mongodb.net/web91_TH"
    );
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export default connectMongo;
