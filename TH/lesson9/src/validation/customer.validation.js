import { object, string } from "yup";

const customerValidationSchema = {
  createCustomer: object({
    name: string().required("Name is required"),
    phone: string().required("Phone is required"),
    address: string().required("Address is required"),
  }),
};

export default customerValidationSchema;
