import { UserModel } from "../model/index.js";

const userController = {
  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new UserModel({ name, email, password });
    newUser.save();
    res.send(newUser);
  },
  getAllUsers: async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.send(user);
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await UserModel.findByIdAndUpdate(id, {
      name,
      email,
      password,
    });
    res.send(user);
  },
};

export default userController;
