import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
