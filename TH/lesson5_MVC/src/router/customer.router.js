import { Router } from "express";

const customerRouter = Router();

customerRouter.get("/", (req, res) => {
  res.send("Hello from customer router");
});

export default customerRouter;
