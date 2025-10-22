import { Router } from "express";
import userRouter from "./user.router";
import commentRouter from "./comment.router";
import { logger } from "../middleware/index.js";

const router = Router();

router.use("/users", logger, userRouter);
router.use("/comments", commentRouter);

export default router;

// api / v1 / users;
