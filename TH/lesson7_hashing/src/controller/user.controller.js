const userController = {
  register: async (req, res) => {
    //Logic here
    res.status(201).send({ message: "User created successfully" });
  },
  login: async (req, res) => {
    //Logic here
    res.status(200).send({ message: "User logged in successfully" });
  },
};

export default userController;
