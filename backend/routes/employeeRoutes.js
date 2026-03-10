const express = require('express');
const employeeController = require('../controllers/employeeController');
const { verifyToken } = require('../middleware/authMiddleware');
const {
	normalizeEmployeeBody,
	validateEmployeeBody,
	validateEmployeeIdParam
} = require('../middleware/validators/employeeValidation');

const router = express.Router();

router.use(verifyToken);

router.get('/stats', employeeController.getEmployeeStats);
router.get('/', employeeController.getEmployees);
router.get('/:id', validateEmployeeIdParam, employeeController.getEmployee);
router.post('/', normalizeEmployeeBody, validateEmployeeBody, employeeController.createEmployee);
router.put('/:id', validateEmployeeIdParam, normalizeEmployeeBody, validateEmployeeBody, employeeController.updateEmployee);
router.delete('/:id', validateEmployeeIdParam, employeeController.deleteEmployee);

module.exports = router;
