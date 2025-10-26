import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

const ProductsModel = mongoose.model("products", productSchema);
export default ProductsModel;
