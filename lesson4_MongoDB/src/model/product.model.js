import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

const DoND = mongoose.model("ALO", productSchema);
export default DoND;
