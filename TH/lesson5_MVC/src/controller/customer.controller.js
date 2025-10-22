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
};

export default customerController;
