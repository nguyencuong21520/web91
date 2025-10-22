import { Router } from "express";
import customerRouter from "./customer.router.js";
import orderRouter from "./order.router.js";

const router = Router();
router.use("/customers", customerRouter);
router.use("/orders", orderRouter);

export default router;
