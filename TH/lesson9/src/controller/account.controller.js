import AccountModel from "../model/account.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const accountController = {
  createAccount: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      //check exist email
      const existEmail = await AccountModel.findOne({ email });
      if (existEmail) {
        throw new Error("Email already exists");
      }

      //hash password
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 5);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAccount = new AccountModel({
        email,
        password: hashedPassword,
        role,
        salt,
      });
      await newAccount.save();
      res.status(201).send({
        message: "Account created",
        data: {
          email: newAccount.email,
          role: newAccount.role,
          createdAt: newAccount.createdAt,
          updatedAt: newAccount.updatedAt,
        },
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating account", error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //find account by email
      const account = await AccountModel.findOne({ email });
      if (!account) {
        throw new Error("Invalid email or password");
      }

      //check account is active
      if (!account.isActive) {
        throw new Error("Account is not active");
      }

      //check password
      const isHashedPassword = await bcrypt.hash(password, account.salt);
      if (isHashedPassword !== account.password) {
        throw new Error("Invalid email or password");
      }

      //create token
      const secretKey = process.env.SECRET_KEY;
      const payload = {
        userId: account._id,
        email: account.email,
        role: account.role,
        type: "AT",
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: "8h" });

      res.status(200).send({ message: "Login successfully", token });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error logging in", error: error.message });
    }
  },
  getProfile: async (req, res) => {
    try {
      const { userId } = req.user;
      const account = await AccountModel.findById(userId, {
        password: 0,
        salt: 0,
      });
      res
        .status(200)
        .send({ message: "Profile fetched successfully", data: account });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error fetching profile", error: error.message });
    }
  },
};

export default accountController;
