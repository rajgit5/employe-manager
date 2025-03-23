import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload  from '../middleware/uploadMiddleware.js';
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js';

const router = express.Router();

// Create a new employee
router.post('/', authMiddleware(['user', 'admin']), upload.single('profilePicture'), createEmployee);

// Get all employees
router.get('/get', authMiddleware(['user', 'admin']), getEmployees);

// Update an employee
router.put('/:id', authMiddleware(['user', 'admin']), upload.single('profilePicture'), updateEmployee);

// Delete an employee
router.delete('/:id', authMiddleware(['admin']), deleteEmployee);

export default router;