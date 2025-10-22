import express from "express";
import mongoose from "mongoose";
import connectMongo from "./src/config/connectMongo.config.js";

const app = express();

connectMongo();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/users", userController.createUser);
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
