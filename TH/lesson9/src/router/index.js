import { Router } from "express";
import accountRouter from "./account.router.js";
import managerRouter from "./manager.router.js";
import authMiddleware from "../middleware/auth.middleware.js";
import employeeRouter from "./employee.router.js";
import customerRouter from "./customer.router.js";

const router = Router();

router.use("/accounts", accountRouter);
router.use(
  "/managers",
  authMiddleware.authenticate,
  authMiddleware.isManager,
  managerRouter
);
router.use(
  "/employees",
  authMiddleware.authenticate,
  authMiddleware.isEmployee,
  employeeRouter
);
router.use(
  "/customers",
  authMiddleware.authenticate,
  authMiddleware.isCustomer,
  customerRouter
);
export default router;
