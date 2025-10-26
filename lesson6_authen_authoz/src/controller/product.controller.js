import { ProductModel } from "../model/index.js";

const productController = {
  getAllProducts: async (req, res) => {
    const products = await ProductModel.find();
    res.status(200).send({ message: "Products list", data: products });
  },
};

export default productController;
