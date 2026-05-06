// ============================================================
// server.js - Entry point for the Express backend server
// This is the Backend Tier of our 3-Tier Architecture
// ============================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas (Database Tier)
connectDB();

const app = express();

// ---- Middleware ----

// Enable CORS so the frontend (different port) can call this API
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ---- Routes ----

// Health check route
app.use('/api', require('./routes/healthRoutes'));

// Student routes
app.use('/api/students', require('./routes/studentRoutes'));

// ---- 404 Handler ----
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ---- Global Error Handler ----
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ---- Start Server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
