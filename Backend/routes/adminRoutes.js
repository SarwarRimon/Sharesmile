const express = require('express');
const db = require('../db');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth'); // Middleware for token checking

// GET total donation amount
router.get('/donations/total', adminAuth, async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT SUM(amount) AS totalDonation FROM donations');
    const total = rows[0].totalDonation || 0;
    res.status(200).json({ totalDonation: total });
  } catch (err) {
    console.error('Error fetching total donations:', err);
    res.status(500).json({ message: 'Error fetching total donations' });
  }
});

module.exports = router;
