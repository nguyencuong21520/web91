import { Router } from "express";
import { orderController } from "../controller/index.js";
import validationMiddleware from "../middleware/validation.middleware.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  validationMiddleware.validateOrderBody,
  orderController.createOrder
);

orderRouter.put(
  "/:id",
  validationMiddleware.validateOrderUpdateBody,
  orderController.updateOrder
);

orderRouter.delete("/:id", orderController.deleteOrder);
export default orderRouter;
