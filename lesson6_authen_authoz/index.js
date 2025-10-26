import express from "express";
import router from "./src/router/index.js";
import connectMongo from "./src/config/connectMongo.config.js";
const app = express();

const PORT = 3002;

app.use(express.json());
connectMongo();

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to the secure area!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
