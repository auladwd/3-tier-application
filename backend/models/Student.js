// ============================================================
// models/Student.js - Mongoose schema for the Student entity
// Defines the structure of student documents in MongoDB
// ============================================================

const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  },
);

// Export the model so controllers can use it
module.exports = mongoose.model('Student', studentSchema);
