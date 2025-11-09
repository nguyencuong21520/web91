import CustomerModel from "../model/customer.model.js";

const customerController = {
  createCustomer: async (req, res) => {
    try {
      const { name, phone, address } = req.body;

      const customerInfo = {
        name,
        phone,
        address,
        email: req.user.email,
        accountId: req.user.userId,
      };

      const customer = await CustomerModel.create(customerInfo);
      res.status(201).send({ message: "Customer created", data: customer });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating customer", error: error.message });
    }
  },
};

export default customerController;
