import { Router } from "express";
import customerController from "../controller/customer.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import customerValidationSchema from "../validation/customer.validation.js";

const customerRouter = Router();

customerRouter.post(
  "/",
  validationMiddleware(customerValidationSchema.createCustomer),
  customerController.createCustomer
);

export default customerRouter;
