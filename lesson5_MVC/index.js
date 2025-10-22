import express from "express";
import connectMongo from "./src/config/connectMongo.config.js";
import router from "./src/router/index.js";

const app = express();

app.use(express.json());

connectMongo();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
