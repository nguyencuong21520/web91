import { OrdersModel, ProductsModel } from "../model/index.js";

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { customerId, productId, quantity } = req.body;

      const productFound = await ProductsModel.findById(productId);
      if (!productFound) {
        throw new Error("Product not found");
      }

      //check quantity
      if (productFound.quantity < quantity) {
        throw new Error("Product quantity not enough");
      }

      const newOrder = new OrdersModel({
        customerId,
        productId,
        quantity,
        totalPrice: productFound.price * quantity,
      });

      await newOrder.save();
      res.status(201).send({ message: "Order created", data: newOrder });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating order", error: error.message });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      //get order need to update by id
      const orderFound = await OrdersModel.findById(id);
      if (!orderFound) {
        throw new Error("Order not found");
      }

      //get product need to update by id
      const productFound = await ProductsModel.findById(orderFound.productId);
      if (!productFound) {
        throw new Error("Product not found");
      }
      //check quantity
      if (productFound.quantity < quantity) {
        throw new Error("Product quantity not enough");
      }

      //update order
      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        id,
        {
          quantity,
          totalPrice: productFound.price * quantity,
        },
        { new: true }
      );
      res.status(200).send({ måessage: "Order updated", data: updatedOrder });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error updating order", error: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await OrdersModel.findByIdAndDelete(id);
      res.status(200).send({ message: "Order deleted", data: deletedOrder });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error deleting order", error: error.message });
    }
  },
};

export default orderController;
