const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../Middleware/validator');
const { protect } = require('../Middleware/auth');
const { authLimiter, loginLimiter, apiLimiter } = require('../Middleware/rateLimiter');
const {
  register,
  login,
  logout,
  getCurrentUser
} = require('../Controllers/authController');

// Registration validation
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

// Login validation
const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

router.post('/register', authLimiter, registerValidation, validate, register);
router.post('/login', loginLimiter, loginValidation, validate, login);
router.post('/logout', protect, apiLimiter, logout);
router.get('/me', protect, apiLimiter, getCurrentUser);

module.exports = router;
