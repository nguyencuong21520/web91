import { Router } from "express";
import userRouter from "./user.router.js";
import productRouter from "./product.router.js";
import fileRouter from "./file.router.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use("/users", userRouter);
router.use("/products", authMiddleware.authenticate, productRouter);
router.use("/files", fileRouter);
export default router;
