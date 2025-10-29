import { object, string } from "yup";

export const userRegisterSchema = object({
  userName: string()
    .required("User name is required")
    .trim()
    .min(1, "User name is required"),
  fullName: string()
    .required("Full name is required")
    .trim()
    .min(1, "Full name is required"),
  email: string().required("Email is required").email("Email is invalid"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: string().required("Role is required").oneOf(["admin", "user"]),
});

export const userLoginSchema = object({
  email: string().required("Email is required").email("Email is invalid"),
  password: string().required("Password is required"),
});
