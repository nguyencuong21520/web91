import { object, string, number } from "yup";

export const orderCreateSchema = object({
  customerId: string().required("Customer ID is required"),
  productId: string().required("Product ID is required"),
  quantity: number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .moreThan(0, "Quantity must be greater than 0"),
});

export const orderUpdateSchema = object({
  quantity: number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .moreThan(0, "Quantity must be greater than 0"),
});
