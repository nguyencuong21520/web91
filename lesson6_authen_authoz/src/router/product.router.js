import { Router } from "express";
import { productController } from "../controller/index.js";
import authMiddleware from "../middleware/auth.middleware.js";

const productRouter = Router();

productRouter.get(
  "/",
  authMiddleware.authorize,
  productController.getAllProducts
);

// productRouter.post(
//   "/",
//   authMiddleware.authorize,
//   productController.createProduct
// );

export default productRouter;
