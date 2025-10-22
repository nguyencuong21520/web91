import { Router } from "express";
import { customerController } from "../controller/index.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import checkExistMiddleware from "../middleware/checkExist.middleware.js";

const customerRouter = Router();

customerRouter.post(
  "/",
  validationMiddleware.validateCustomerBody,
  checkExistMiddleware.checkExistEmailFromCustomer,
  customerController.createCustomer
);

export default customerRouter;
