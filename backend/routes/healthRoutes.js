// ============================================================
// routes/healthRoutes.js - Health check endpoint
// Used to verify the backend server is running
// ============================================================

const express = require('express');
const router = express.Router();

// GET /api/health - Returns server status
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend server is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
