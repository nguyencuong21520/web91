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
};

export default authMiddleware;
