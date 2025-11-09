import { Router } from "express";
import accountRouter from "./account.router.js";
import uploadRouter from "./upload.router.js";

const router = Router();

router.use("/accounts", accountRouter);
router.use("/upload", uploadRouter);

export default router;
