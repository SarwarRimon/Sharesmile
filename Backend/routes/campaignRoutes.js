const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all active campaigns
router.get('/active', async (req, res) => {
  try {
    const [campaigns] = await db.promise().query(
      `SELECT c.*, hr.document_path 
       FROM campaigns c
       LEFT JOIN help_requests hr ON c.help_request_id = hr.id
       WHERE c.status = 'active'
       ORDER BY c.created_at DESC`
    );
    res.json(campaigns);
  } catch (err) {
    console.error('Error fetching campaigns:', err);
    res.status(500).json({ message: 'Error fetching campaigns' });
  }
});

module.exports = router;
