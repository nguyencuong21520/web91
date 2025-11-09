// models/DepositOrder.js
import mongoose from "mongoose";

const depositOrderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    depositAmount: Number,
    date: String,
    status: {
      type: String,
      enum: ["PAID", "PENDING", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const DepositOrderModel = mongoose.model("DepositOrder", depositOrderSchema);
export default DepositOrderModel;
