import { Router } from "express";
import customerRouter from "./customer.router.js";
import orderRouter from "./order.router.js";
import userRouter from "./user.router.js";
const router = Router();
router.use("/customers", customerRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);

export default router;
