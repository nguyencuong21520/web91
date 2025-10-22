import { CustomersModel } from "../model";

const checkExistMiddleware = {
  checkExistEmailFromCustomer: async (req, res, next) => {
    const { email } = req.body;
    const customerFound = await CustomersModel.findOne({ email });
    if (customerFound) {
      return res.status(400).send("Email already exists");
    }
    next();
  },
};

export default checkExistMiddleware;
