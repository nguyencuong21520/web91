import { CustomersModel } from "../model/index.js";

const authMiddleware = {
  authenticate: async (req, res, next) => {
    const { apiKey } = req.query;

    //Check 1: apiKey is required
    if (!apiKey) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    //Check 2: apiKey format is valid
    // apiKey format: web-<customerId>-<email>-<randomString> web-68f4fba5e10fb178e710b630-nguyenvana@example.com-6vcbkfiqo38
    const [scretKey, customerId, email, randomString] = apiKey.split("-");
    if (scretKey !== "web" || !customerId || !email || !randomString) {
      return res.status(401).send({ message: "invalid api key" });
    }

    //Check 3: customer is exist
    const customerFound = await CustomersModel.findOne({
      _id: customerId,
      email,
    });
    if (!customerFound) {
      return res.status(401).send({ message: "customer not found" });
    }

    next();
  },
};

export default authMiddleware;
