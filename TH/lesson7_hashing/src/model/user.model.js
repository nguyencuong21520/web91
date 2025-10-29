import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    fullName: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    salt: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
