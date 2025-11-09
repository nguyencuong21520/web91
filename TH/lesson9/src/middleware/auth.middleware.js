import jwt from "jsonwebtoken";
const authMiddleware = {
  authenticate: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const secretKey = process.env.SECRET_KEY;

    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send({ message: "Unauthorized 2" });
    }
  },
  isManager: async (req, res, next) => {
    if (req.user.role !== "MANAGER") {
      return res.status(403).send({ message: "You cant access this resource" });
    }
    next();
  },
  isCustomer: async (req, res, next) => {
    if (req.user.role !== "CUSTOMER") {
      return res.status(403).send({ message: "You cant access this resource" });
    }
    next();
  },
  isEmployee: async (req, res, next) => {
    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).send({ message: "You cant access this resource" });
    }
    next();
  },
};

export default authMiddleware;
