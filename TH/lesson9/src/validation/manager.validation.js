import { object, string } from "yup";
const managerValidationSchema = {
  createManager: object({
    name: string().required("Name is required"),
    phone: string().required("Phone is required"),
    department: string().required("Department is required"),
  }),
};

export default managerValidationSchema;
