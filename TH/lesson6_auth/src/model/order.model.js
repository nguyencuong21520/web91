import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    quantity: Number,
    totalPrice: Number,
  },
  { timestamps: true }
);

const OrdersModel = mongoose.model("orders", orderSchema);
export default OrdersModel;
