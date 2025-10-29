import { CustomersModel } from "../model/index.js";
const customerController = {
  createCustomer: async (req, res) => {
    try {
      const { name, email, age } = req.body;
      const newCustomer = new CustomersModel({ name, email, age });
      await newCustomer.save();
      res.status(201).send({ message: "Customer created", data: newCustomer });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating customer", error: error.message });
    }
  },
  getApiKey: async (req, res) => {
    try {
      const { id } = req.params;

      const customerFund = await CustomersModel.findById(id);
      if (!customerFund) {
        throw new Error("Customer not found");
      }

      const customerId = customerFund._id;
      const email = customerFund.email;
      const randomString = Math.random().toString(36).substring(2, 15);

      const apiKey = `web-${customerId}-${email}-${randomString}`;

      return res.status(200).send({ message: "Customer found", data: apiKey });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting api key", error: error.message });
    }
  },
  getAllCustomers: async (req, res) => {
    try {
      const customers = await CustomersModel.find();

      if (customers.length <= 0) {
        throw new Error("Customers not found");
      }

      return res
        .status(200)
        .send({ message: "Customers found", data: customers });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting all customers", error: error.message });
    }
  },
};

export default customerController;
