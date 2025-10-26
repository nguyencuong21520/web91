const authMiddleware = {
  authenticate: async (req, res, next) => {
    const { authenticated } = req.body;
    //logic check authenticated
    if (!authenticated) {
      return res.status(401).send("Unauthorized");
    }
    next();
  },
  authorize: async (req, res, next) => {
    const { role } = req.body;
    //logic check role
    if (role !== "admin") {
      return res
        .status(403)
        .send("Forbidden: You are not authorized to access this resource");
    }
    next();
  },
};

export default authMiddleware;
