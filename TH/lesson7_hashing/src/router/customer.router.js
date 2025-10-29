import { Router } from "express";
import { customerController } from "../controller/index.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import checkExistMiddleware from "../middleware/checkExist.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const customerRouter = Router();

customerRouter.post(
  "/",
  validationMiddleware.validateCustomerBody,
  checkExistMiddleware.checkExistEmailFromCustomer,
  customerController.createCustomer
);
customerRouter.get("/getApikey/:id", customerController.getApiKey);
customerRouter.get(
  "/",
  authMiddleware.authenticate,
  customerController.getAllCustomers
);

export default customerRouter;
