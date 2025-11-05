import { Router } from "express";
import accountRouter from "./account.router.js";

const router = Router();

router.use("/accounts", accountRouter);

export default router;
