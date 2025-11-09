import { Router } from "express";
import managerController from "../controller/manager.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import managerValidationSchema from "../validation/manager.validation.js";
import employeeValidationSchema from "../validation/employee.validation.js";
import employeeController from "../controller/employee.controller.js";
const managerRouter = Router();

managerRouter.post(
  "/",
  validationMiddleware(managerValidationSchema.createManager),

  managerController.createManager
);
managerRouter.post(
  "/managerCreateEmployee",
  validationMiddleware(employeeValidationSchema.managerCreateEmployee),
  employeeController.managerCreateEmployee
);

export default managerRouter;
