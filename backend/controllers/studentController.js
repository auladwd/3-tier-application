// ============================================================
// controllers/studentController.js - Business logic for students
// MVC Pattern: Controller handles request/response logic
// ============================================================

const Student = require('../models/Student');

// @desc    Get all students
// @route   GET /api/students
const getAllStudents = async (req, res) => {
  try {
    // Fetch all students, sorted by newest first
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

// @desc    Add a new student
// @route   POST /api/students
const addStudent = async (req, res) => {
  const { name, email, department } = req.body;

  // Basic validation
  if (!name || !email || !department) {
    return res
      .status(400)
      .json({ message: 'Please provide name, email, and department' });
  }

  try {
    // Create and save the new student document
    const student = await Student.create({ name, email, department });
    res.status(201).json(student);
  } catch (error) {
    // Handle duplicate email error from MongoDB
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'A student with this email already exists' });
    }
    console.error('Error adding student:', error.message);
    res.status(500).json({ message: 'Failed to add student' });
  }
};

module.exports = { getAllStudents, addStudent };
