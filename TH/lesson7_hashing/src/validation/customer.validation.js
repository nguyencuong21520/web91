import { object, string, number } from "yup";

export const customerCreateSchema = object({
  name: string().required("Name is required").trim().min(1, "Name is required"),
  email: string().required("Email is required").email("Email is invalid"),
  age: number()
    .required("Age is required")
    .integer("Age must be an integer")
    .min(0, "Age must be at least 0"),
});
