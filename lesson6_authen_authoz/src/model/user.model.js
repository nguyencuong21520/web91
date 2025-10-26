import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    fullName: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
