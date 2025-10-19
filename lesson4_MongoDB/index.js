import express from "express";
import connectMongo from "./src/data/connectMongo.js";
import UsersModel from "./src/model/user.model.js";
import DoND from "./src/model/product.model.js";

const app = express();
const PORT = 3001;

connectMongo();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/users", async (req, res) => {
  const { userName, email, password } = req.body;

  const newUser = {
    userName,
    email,
    password,
  };

  const createdUser = new UsersModel(newUser);
  await createdUser.save();
  res.status(201).send({ message: "User created", data: newUser });
});
//Create product
app.post("/products", async (req, res) => {
  const { name, price, quantity } = req.body;

  const newProduct = {
    name,
    price,
    quantity,
  };

  const createdProduct = new DoND(newProduct);
  await createdProduct.save();
  res.status(201).send({ message: "Product created", data: newProduct });
});

//Get all products
app.get("/products", async (req, res) => {
  const products = await DoND.find();
  res.status(200).send({ message: "Products list", data: products });
});

//GET product by id
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await DoND.findById(id);
  res.status(200).send({ message: "Product found", data: product });
});

//GET product by name and price
app.get("/products", async (req, res) => {
  const { name } = req.query;
  const product = await DoND.find({ name: { $regex: name, $options: "i" } });
  res.status(200).send({ message: "Product found", data: product });
});

//update product by id
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  const updatedProduct = await DoND.findByIdAndUpdate(
    id,
    { name, price, quantity },
    { new: true }
  );
  res.status(200).send({ message: "Product updated", data: updatedProduct });
});

//delete product by id
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await DoND.findByIdAndDelete(id);
  res.status(200).send({ message: "Product deleted", data: deletedProduct });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
