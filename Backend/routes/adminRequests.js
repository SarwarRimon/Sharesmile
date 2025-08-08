const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');

// ✅ Only allow admin (you can expand this check)
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
}

// 📌 Get all pending requests
router.get('/pending', authenticateToken, requireAdmin, (req, res) => {
  const sql = 'SELECT * FROM help_requests WHERE status = "pending" ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching pending requests:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

// 📌 Approve or Reject request
router.put('/:id/status', authenticateToken, requireAdmin, (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'
  const { id } = req.params;

  const sql = 'UPDATE help_requests SET status = ?, updated_at = NOW() WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating request status:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: `Request ${status} successfully` });
  });
});

module.exports = router;
