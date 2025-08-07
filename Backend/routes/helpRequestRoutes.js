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

module.exports = router;
