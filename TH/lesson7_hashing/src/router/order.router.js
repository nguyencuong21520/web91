import { Router } from "express";
import { orderController } from "../controller/index.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import {
  orderCreateSchema,
  orderUpdateSchema,
} from "../validation/order.validation.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  validationMiddleware(orderCreateSchema),
  orderController.createOrder
);

orderRouter.put(
  "/:id",
  validationMiddleware(orderUpdateSchema),
  orderController.updateOrder
);

orderRouter.delete("/:id", orderController.deleteOrder);
export default orderRouter;
