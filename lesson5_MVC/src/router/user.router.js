import { Router } from "express";
import { userController } from "../controller/index.js";
import { myLogger, validateRequestBody } from "../middleware/index.js";

const userRouter = Router();

userRouter.post("/", myLogger, validateRequestBody, userController.createUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUser);

export default userRouter;
