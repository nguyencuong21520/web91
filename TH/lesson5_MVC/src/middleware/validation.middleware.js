const validationMiddleware = {
  validateOrderBody: (req, res, next) => {
    const { customerId, productId, quantity } = req.body;
    if (!customerId || !productId || !quantity) {
      return res
        .status(400)
        .send("Customer ID, product ID and quantity are required");
    }
    next();
  },
  validateOrderUpdateBody: (req, res, next) => {
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
      return res.status(400).send("Quantity is required");
    }
    next();
  },
  validateCustomerBody: (req, res, next) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).send("Name, email and age are required");
    }
    next();
  },
};

export default validationMiddleware;
