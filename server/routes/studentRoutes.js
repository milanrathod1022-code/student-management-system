const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Validation rules
const studentValidationRules = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('age').optional().isInt({ min: 1, max: 150 }).withMessage('Age must be between 1 and 150'),
  body('status').optional().isIn(['active', 'inactive', 'graduated']).withMessage('Invalid status'),
];

// Routes
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', studentValidationRules, createStudent);
router.put('/:id', studentValidationRules, updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
