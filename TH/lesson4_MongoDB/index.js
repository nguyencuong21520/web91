import express from "express";
import connectMongo from "./src/data/connectMongo.js";
import CustomersModel from "./src/model/customer.model.js";
import ProductsModel from "./src/model/product.model.js";
import OrdersModel from "./src/model/order.model.js";
const app = express();
const PORT = 3001;

connectMongo();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! This is my first MongoDB project");
});

// Code Here
// POST create new customer
app.post("/customers", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    //validate data
    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    if (!age) throw new Error("Age is required");

    const newCustomer = new CustomersModel({ name, email, age });
    await newCustomer.save();

    res.status(201).send({ message: "Customer created", data: newCustomer });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating customer", error: error.message });
  }
});

//GET customer by query
app.get("/customers/filter", async (req, res) => {
  try {
    const { name, email, gtAge, ltAge } = req.query;
    const filter = {};

    if (name) filter.name = name;
    if (email) filter.email = email;
    if (gtAge || ltAge) {
      filter.age = {};
      if (gtAge) filter.age.$gt = parseInt(gtAge);
      if (ltAge) filter.age.$lt = parseInt(ltAge);
    }

    const customer = await CustomersModel.find(filter);

    if (customer.length > 0) {
      res.status(200).send({ message: "Customer found", data: customer });
    }
    res.status(404).send({ message: "Customer not found", data: [] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting customer", error: error.message });
  }
});

//GET all customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await CustomersModel.find();
    res.status(200).send({ message: "Customers found", data: customers });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting customers", error: error.message });
  }
});

//POST create new product
app.post("/products", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const newProduct = new ProductsModel({ name, price, quantity });
    await newProduct.save();
    res.status(201).send({ message: "Product created", data: newProduct });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating product", error: error.message });
  }
});

//POST orders
app.post("/orders", async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;

    if (!customerId) throw new Error("Customer ID is required");
    if (!productId) throw new Error("Product ID is required");
    if (!quantity) throw new Error("Quantity is required");

    const productFound = await ProductsModel.findById(productId);
    if (!productFound) throw new Error("Product not found");
    if (productFound.quantity < quantity)
      throw new Error("Product quantity not enough");

    const newOrder = new OrdersModel({
      customerId,
      productId,
      quantity,
      totalPrice: productFound.price * quantity,
    });
    await newOrder.save();

    res.status(201).send({ message: "Order created", data: newOrder });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating order", error: error.message });
  }
});

//GET all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find();
    res.status(200).send({ message: "Orders found", data: orders });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting orders", error: error.message });
  }
});

//PUT update order
app.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const orderFound = await OrdersModel.findById(id);
    if (!orderFound) throw new Error("Order not found");
    if (!quantity) throw new Error("Quantity is required");

    const productFound = await ProductsModel.findById(orderFound.productId);
    if (!productFound) throw new Error("Product not found");
    if (productFound.quantity < quantity)
      throw new Error("Product quantity not enough");

    const updatedOrder = await OrdersModel.findByIdAndUpdate(
      id,
      { quantity, totalPrice: productFound.price * quantity },
      { new: true }
    );

    res.status(200).send({ message: "Order updated", data: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating order", error: error.message });
  }
});

//DELETE /customers/:id
app.delete("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await CustomersModel.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "Customer deleted", data: deletedCustomer });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting customer", error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
