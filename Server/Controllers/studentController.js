const User = require('../Models/User');
const path = require('path');

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      profile: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update personal details
// @route   PUT /api/student/personal
// @access  Private
exports.updatePersonalDetails = async (req, res, next) => {
  try {
    const { name, phone, dateOfBirth, address } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (phone) fieldsToUpdate.phone = phone;
    if (dateOfBirth) fieldsToUpdate.dateOfBirth = dateOfBirth;
    if (address) fieldsToUpdate.address = address;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Personal details updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update academic details
// @route   PUT /api/student/academic
// @access  Private
exports.updateAcademicDetails = async (req, res, next) => {
  try {
    const { program, year, semester, gpa, enrolledCourses, grades } = req.body;

    const fieldsToUpdate = {};
    if (program) fieldsToUpdate.program = program;
    if (year) fieldsToUpdate.year = year;
    if (semester) fieldsToUpdate.semester = semester;
    if (gpa !== undefined) fieldsToUpdate.gpa = gpa;
    if (enrolledCourses) fieldsToUpdate.enrolledCourses = enrolledCourses;
    if (grades) fieldsToUpdate.grades = grades;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Academic details updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload profile picture
// @route   POST /api/student/profile-picture
// @access  Private
exports.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: `/uploads/${req.file.filename}` },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
      profilePicture: user.profilePicture
    });
  } catch (error) {
    next(error);
  }
};
