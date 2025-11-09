import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    address: String,
    price: Number,
    area: Number,
    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD", "PENDING"],
      default: "AVAILABLE",
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

const PropertyModel = mongoose.model("Property", propertySchema);
export default PropertyModel;
