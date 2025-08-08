const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/authenticateToken');
const db = require('../db');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure uploads folder exists in your backend root
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/', authenticateToken, upload.single('document'), (req, res) => {
  const { title, description, amount } = req.body;
  const userId = req.user.id;
  const documentPath = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO help_requests (user_id, title, description, amount, document_path, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'pending', NOW(), NOW())
  `;

  db.query(sql, [userId, title, description, amount, documentPath], (err, result) => {
    if (err) {
      console.error('Error inserting help request:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Help request submitted successfully' });
  });
});



// Get logged-in user's requests
router.get('/my-requests', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT id, title, description, amount, document_path, status, created_at
    FROM help_requests
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching requests:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

// Admin: Get all requests
router.get('/admin/all-requests', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const sql = `
    SELECT hr.id, hr.title, hr.description, hr.amount, hr.document_path, hr.status, hr.created_at,
           u.name as user_name
    FROM help_requests hr
    JOIN users u ON hr.user_id = u.id
    ORDER BY hr.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching all requests:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

// Admin: Approve or finish a request
router.put('/:id/status', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const { status } = req.body;
  const sql = `UPDATE help_requests SET status = ? WHERE id = ?`;

  db.query(sql, [status, req.params.id], (err) => {
    if (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: `Request ${status} successfully` });
  });
});

module.exports = router;
