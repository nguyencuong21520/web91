import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const UsersModel = mongoose.model("users", userSchema);
export default UsersModel;
