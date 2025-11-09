import EmployeeModel from "../model/employee.model.js";
const employeeController = {
  createEmployee: async (req, res) => {
    try {
      const { name, phone, apartment, managerId } = req.body;
      const employeeInfo = {
        name,
        phone,
        apartment,
        managerId,
        accountId: req.user.userId,
        email: req.user.email,
      };
      const employee = await EmployeeModel.create(employeeInfo);
      res.status(201).send({ message: "Employee created", data: employee });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating employee", error: error.message });
    }
  },
  managerCreateEmployee: async (req, res) => {
    try {
      const { name, phone, department, email, accountId } = req.body;
      const employeeInfo = {
        name,
        phone,
        department,
        email,
        accountId,
        managerId: req.user.userId,
      };
      const employee = await EmployeeModel.create(employeeInfo);
      res.status(201).send({ message: "Employee created", data: employee });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating employee", error: error.message });
    }
  },
};

export default employeeController;
