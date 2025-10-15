import express from "express";
import axios from "axios";
import { customers, orders, products } from "./data.js";

const PORT = 3002;
const BASE_URL = "http://localhost:3000";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

// Bài 1: GET /customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await axios.get(`${BASE_URL}/customers`);
    const data = customers.data;

    if (data.length > 0) {
      return res.status(200).send({
        data: data,
        message: "Customers list",
      });
    }
    return res.status(404).send({ message: "Customers not found", data: [] });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting customers", error: error.message });
  }
});

// Bài 2: GET /customers/:customerId
app.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Id is required");
    }

    const customer = await axios.get(`${BASE_URL}/customers/${id}`);
    const data = customer.data;

    if (data) {
      return res.status(200).send({
        data: data,
        message: "Customer found",
      });
    }
    return res.status(404).send({ message: "Customer not found", data: null });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting customer", error: error.message });
  }
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

// Bài 8: PUT /orders/:orderId

app.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const orderFound = await axios.get(`${BASE_URL}/orders/${id}`);
    const order = orderFound.data;

    if (!order) {
      throw new Error("Order not found");
    }

    const productId = order.productId;

    const productFound = await axios.get(`${BASE_URL}/products/${productId}`);
    const product = productFound.data;

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.quantity < quantity) {
      throw new Error("Product quantity not enough");
    }

    const newOrder = {
      ...order,
      quantity,
      totalPrice: product.price * quantity,
    };

    const updatedOrder = await axios.put(`${BASE_URL}/orders/${id}`, newOrder);
    const data = updatedOrder.data;

    if (data) {
      return res.status(200).send({ message: "Order updated", data: data });
    }
    return res.status(404).send({ message: "Order not found", data: null });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating order", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
