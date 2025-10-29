import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
  },
  { timestamps: true }
);

const CustomersModel = mongoose.model("customers", customerSchema);
export default CustomersModel;
