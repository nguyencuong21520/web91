import { Router } from "express";
import { userController } from "../controller/index.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import {
  userRegisterSchema,
  userLoginSchema,
} from "../validation/user.validation.js";

const userRouter = Router();

userRouter.post(
  "/register",
  validationMiddleware(userRegisterSchema),
  userController.register
);
userRouter.post(
  "/login",
  validationMiddleware(userLoginSchema),
  userController.login
);

export default userRouter;
