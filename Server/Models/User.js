const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  phone: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  address: {
    type: String
  },
  profilePicture: {
    type: String,
    default: ''
  },
  studentId: {
    type: String,
    unique: true,
    sparse: true
  },
  program: {
    type: String
  },
  year: {
    type: String
  },
  semester: {
    type: String
  },
  gpa: {
    type: Number,
    min: 0,
    max: 4
  },
  enrolledCourses: [{
    type: String
  }],
  grades: [{
    course: String,
    grade: String,
    credits: Number,
    semester: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update timestamp on save
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);
