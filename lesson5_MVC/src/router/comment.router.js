import { Router } from "express";
import { commentController } from "../controller/index.js";
const commentRouter = Router();

commentRouter.get("/", commentController.searchComments);
commentRouter.post("/", commentController.createComment);
commentRouter.put("/:id", commentController.updateComment);
export default commentRouter;
