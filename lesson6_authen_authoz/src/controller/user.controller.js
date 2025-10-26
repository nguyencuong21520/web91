import { UserModel } from "../model/index.js";
const userController = {
  register: async (req, res) => {
    const { userName, password, role, fullName } = req.body;

    //check exist userName
    const userFound = await UserModel.findOne({ userName });
    if (userFound) {
      return res.status(400).send("User already exists");
    }

    //create new user
    const newUser = new UserModel({ userName, password, role, fullName });
    await newUser.save();
    res.status(201).send(newUser);
  },
  login: async (req, res) => {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ userName, password });
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }
    res.status(200).send(user);
  },
};

export default userController;
