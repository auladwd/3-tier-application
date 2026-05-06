// ============================================================
// routes/studentRoutes.js - Express routes for student API
// Maps HTTP methods and paths to controller functions
// ============================================================

const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  addStudent,
} = require('../controllers/studentController');

// GET /api/students  - Retrieve all students
router.get('/', getAllStudents);

// POST /api/students - Add a new student
router.post('/', addStudent);

module.exports = router;
