const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../Middleware/auth');
const { apiLimiter } = require('../Middleware/rateLimiter');
const {
  getProfile,
  updatePersonalDetails,
  updateAcademicDetails,
  uploadProfilePicture
} = require('../Controllers/studentController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Sanitize filename and ensure safe extension
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error('Invalid file extension'));
    }
    
    cb(null, `${req.user.id}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

router.get('/profile', protect, apiLimiter, getProfile);
router.put('/personal', protect, apiLimiter, updatePersonalDetails);
router.put('/academic', protect, apiLimiter, updateAcademicDetails);
router.post('/profile-picture', protect, apiLimiter, upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;
