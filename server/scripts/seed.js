require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('../models/Student');

const sampleStudents = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    age: 20,
    grade: 'A',
    course: 'Computer Science',
    phone: '555-0101',
    address: '123 Main St, City, State 12345',
    status: 'active',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    age: 22,
    grade: 'B+',
    course: 'Mathematics',
    phone: '555-0102',
    address: '456 Oak Ave, City, State 12345',
    status: 'active',
  },
  {
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@example.com',
    age: 21,
    grade: 'A-',
    course: 'Physics',
    phone: '555-0103',
    address: '789 Pine Rd, City, State 12345',
    status: 'inactive',
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    age: 23,
    grade: 'B',
    course: 'Chemistry',
    phone: '555-0104',
    address: '321 Elm St, City, State 12345',
    status: 'active',
  },
  {
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@example.com',
    age: 24,
    grade: 'A+',
    course: 'Computer Science',
    phone: '555-0105',
    address: '654 Maple Dr, City, State 12345',
    status: 'graduated',
  },
  {
    firstName: 'Frank',
    lastName: 'Miller',
    email: 'frank.miller@example.com',
    age: 19,
    grade: 'C+',
    course: 'Biology',
    phone: '555-0106',
    address: '987 Cedar Ln, City, State 12345',
    status: 'active',
  },
  {
    firstName: 'Grace',
    lastName: 'Wilson',
    email: 'grace.wilson@example.com',
    age: 20,
    grade: 'A-',
    course: 'Engineering',
    phone: '555-0107',
    address: '147 Birch Ct, City, State 12345',
    status: 'active',
  },
  {
    firstName: 'Henry',
    lastName: 'Moore',
    email: 'henry.moore@example.com',
    age: 22,
    grade: 'B',
    course: 'Economics',
    phone: '555-0108',
    address: '258 Spruce Way, City, State 12345',
    status: 'inactive',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Student.deleteMany({});
    console.log('Cleared existing students');

    // Insert sample data
    const students = await Student.insertMany(sampleStudents);
    console.log(`Inserted ${students.length} sample students`);

    console.log('\nSample students created successfully:');
    students.forEach((student) => {
      console.log(`- ${student.firstName} ${student.lastName} (${student.course})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
