import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());
const PORT = 3001;

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

app.get("/users", async (req, res) => {
  // gọi vào JSON Server
  const users = await axios.get("http://localhost:3000/users");
  const data = users.data;

  res.status(200).send({
    data: data,
    message: "Users list",
  });
});

app.post("/users", async (req, res) => {
  try {
    const { id, userName } = req.body;

    if (!id) throw new Error("Id is required");
    if (!userName) throw new Error("UserName is required");

    const newUser = {
      id,
      userName,
    };

    // gọi vào JSON Server
    const users = await axios.post("http://localhost:3000/users", newUser);
    const data = users.data;

    res.status(200).send({
      data: data,
      message: "User created",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
