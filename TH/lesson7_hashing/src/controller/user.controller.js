import { UserModel } from "../model/index.js";
import bcrypt from "bcrypt";

const userController = {
  register: async (req, res) => {
    const { userName, fullName, email, password, role } = req.body;

    //Check exist email
    const userFound = await UserModel.findOne({ email });
    if (userFound) {
      return res.status(400).send("Email already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 5);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new UserModel({
      userName,
      fullName,
      email,
      password: hashedPassword,
      role,
      salt,
    });
    await newUser.save();

    res.status(201).send({
      message: "User created successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  },
  login: async (req, res) => {
    //Logic here
    const { email, password } = req.body;

    //find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    //hashing password with salt
    const isHashedPassword = await bcrypt.hash(password, user.salt);
    if (isHashedPassword !== user.password) {
      return res.status(401).send("Invalid email or password");
    }

    //generate token

    const token = `${process.env.SECRET_KEY}-${email}-${
      user.fullName
    }-${Math.random().toString(36).substring(2, 15)}`;

    res.status(200).send({ message: "User logged in successfully", token });
  },
};

export default userController;
