import { object, string } from "yup";
const employeeValidationSchema = {
  createEmployee: object({
    name: string().required("Name is required"),
    phone: string().required("Phone is required"),
    department: string().required("Department is required"),
    managerId: string().required("Manager ID is required"),
  }),

  managerCreateEmployee: object({
    name: string().required("Name is required"),
    phone: string().required("Phone is required"),
    department: string().required("Department is required"),
    email: string().email("Email is invalid").required("Email is required"),
    accountId: string().required("Account ID is required"),
  }),
};

export default employeeValidationSchema;
