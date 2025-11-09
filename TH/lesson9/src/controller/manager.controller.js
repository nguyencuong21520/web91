import ManagerModel from "../model/manager.model.js";
const managerController = {
  createManager: async (req, res) => {
    try {
      const { name, phone, department } = req.body;

      const managerInfo = {
        name,
        phone,
        email: req.user.email,
        department,
        accountId: req.user.userId,
      };

      const manager = await ManagerModel.create(managerInfo);
      res.status(201).send({ message: "Manager created", data: manager });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating manager", error: error.message });
    }
  },
};

export default managerController;
