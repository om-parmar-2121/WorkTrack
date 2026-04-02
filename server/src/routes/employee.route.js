import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { deleteEmployee, getAllEmployees, getEmployeeById, getMyEmployeeProfile, getPendingEmployees, updateEmployee } from '../controller/employee.controller.js';

const router = express.Router();

router.get('/', isAuthenticated, getAllEmployees);
router.get('/me', isAuthenticated, getMyEmployeeProfile);
router.get('/pending', isAuthenticated, getPendingEmployees);
router.get('/:employeeId', isAuthenticated, getEmployeeById);
router.patch('/:employeeId', isAuthenticated, updateEmployee);
router.delete('/:employeeId', isAuthenticated, deleteEmployee);

export default router;