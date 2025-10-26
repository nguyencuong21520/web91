import express from "express";
import connectMongo from "./src/config/connectMongo.js";
import router from "./src/router/index.js";
const app = express();
const PORT = 3001;

connectMongo();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
