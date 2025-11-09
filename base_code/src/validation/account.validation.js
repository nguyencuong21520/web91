import { object, string } from "yup";

const accountValidationSchema = {
  createAccount: object({
    email: string().email("Email is invalid").required("Email is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: string()
      .required("Role is required")
      .oneOf(["MANAGER", "CUSTOMER", "EMPLOYEE"], "Role is invalid"),
  }),
  login: object({
    email: string().email("Email is invalid").required("Email is required"),
    password: string().required("Password is required"),
  }),
};

export default accountValidationSchema;
