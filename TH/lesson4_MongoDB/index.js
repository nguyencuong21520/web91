import express from "express";
import connectMongo from "./src/data/connectMongo.js";
const app = express();
const PORT = 3001;

connectMongo();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! This is my first MongoDB project");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
