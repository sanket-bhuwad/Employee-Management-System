const employeeModel = require('../models/employeeModel');

const getEmployees = async (req, res, next) => {
  try {
    const { search = '', department = '', page = 1, limit = 10 } = req.query;
    const result = await employeeModel.getAllEmployees({ search, department, page, limit });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const employee = await employeeModel.getEmployeeById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(employee);
  } catch (error) {
    return next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const employee = await employeeModel.createEmployee(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already exists' });
    }

    return next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeModel.updateEmployee(req.params.id, req.body);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(employee);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already exists' });
    }

    return next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const isDeleted = await employeeModel.deleteEmployee(req.params.id);

    if (!isDeleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

const getEmployeeStats = async (req, res, next) => {
  try {
    const stats = await employeeModel.getEmployeeStats();
    return res.status(200).json(stats);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
};
