import { Router } from "express";
import employeeController from "../controller/employee.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import employeeValidationSchema from "../validation/employee.validation.js";

const employeeRouter = Router();

employeeRouter.post(
  "/",
  validationMiddleware(employeeValidationSchema.createEmployee),
  employeeController.createEmployee
);

export default employeeRouter;
