import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    department: String,
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
    },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model("Employee", employeeSchema);
export default EmployeeModel;
