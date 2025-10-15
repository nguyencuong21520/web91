import express from "express";
import { customers, orders, products } from "./data.js";

const PORT = 3002;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

// Bài 1: GET /customers
app.get("/customers", (req, res) => {
  res.status(200).send({
    data: customers,
    message: "Customers list",
  });
});

// Bài 2: GET /customers/:customerId
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const customer = customers.find((c) => c.id === id);

  if (customer) {
    return res.status(200).send({
      data: customer,
      message: "Customer found",
    });
  }
  return res.status(404).send({ message: "Customer not found", data: null });
});

// Bài 3: GET /customers/:customerId/orders
app.get("/customers/:customerId/orders", (req, res) => {
  const { customerId } = req.params;

  const ordersResult = orders.filter((o) => o.customerId === customerId);

  if (ordersResult.length > 0) {
    return res
      .status(200)
      .send({ data: ordersResult, message: "Orders found" });
  }
  return res.status(404).send({ message: "Orders not found", data: [] });
});

// Bài 4: GET /orders/highvalue
app.get("/orders/highvalue", (req, res) => {
  const highValueOrders = orders.filter((o) => o.totalPrice > 10000000);

  if (highValueOrders.length > 0) {
    return res
      .status(200)
      .send({ data: highValueOrders, message: "High value orders found" });
  }
  return res
    .status(404)
    .send({ message: "High value orders not found", data: [] });
});

//Bài 5: GET /products?minPrice=5000000&maxPrice=10000000
app.get("/products", (req, res) => {
  const { minPrice, maxPrice } = req.query;

  const productsResult = products.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice
  );

  if (productsResult.length > 0) {
    return res
      .status(200)
      .send({ data: productsResult, message: "Products found" });
  }
  return res.status(404).send({ message: "Products not found", data: [] });
});

// Bài 6: POST create new customer
app.post("/customers", (req, res) => {
  const { name, email, age } = req.body;

  const existingCustomer = customers.find((c) => c.email === email);

  if (existingCustomer) {
    return res.status(400).send({ message: "Customer already exists" });
  }

  const newCustomer = {
    id: `c-${Math.random().toString(36).substr(2, 9)}`,
    name,
    email,
    age,
  };
  customers.push(newCustomer);
  return res
    .status(201)
    .send({ message: "Customer created", data: newCustomer });
});

// Bài 7: POST create new order
app.post("/orders", (req, res) => {
  const { customerId, productId, quantity } = req.body;

  const productFound = products.find((p) => p.id === productId);

  if (!productFound) {
    return res.status(404).send({ message: "Product not found" });
  }

  if (productFound.quantity < quantity) {
    return res.status(400).send({ message: "Product quantity not enough" });
  }

  const newOrder = {
    id: `o-${Math.random().toString(36).substr(2, 9)}`,
    customerId,
    productId,
    quantity,
    totalPrice: productFound.price * quantity,
  };
  orders.push(newOrder);
  return res.status(201).send({ message: "Order created", data: newOrder });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
