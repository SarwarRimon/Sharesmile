const express = require('express');
const router = express.Router();
const db = require('../db');
const adminAuth = require('../middleware/adminAuth');

// Get all help requests
router.get('/help-requests', adminAuth, async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT hr.*, u.name as user_name, u.email as user_email 
      FROM help_requests hr 
      JOIN users u ON hr.user_id = u.id 
      ORDER BY hr.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching help requests:', err);
    res.status(500).json({ message: 'Error fetching help requests' });
  }
});

// Update help request status
router.put('/help-requests/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log('Received update request:', { id, status }); // Debug log

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Update help request status
    const [result] = await db.promise().query(
      'UPDATE help_requests SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      await db.promise().rollback();
      return res.status(404).json({ message: 'Help request not found' });
    }

    // Get the user_id from the help request
    const [requestRows] = await db.promise().query(
      'SELECT user_id, title FROM help_requests WHERE id = ?',
      [id]
    );

    if (requestRows.length === 0) {
      await db.promise().rollback();
      return res.status(404).json({ message: 'Help request not found' });
    }

    // Update notification for the user
    await db.promise().query(
      'INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, NOW())',
      [
        requestRows[0].user_id,
        `Your help request "${requestRows[0].title}" has been ${status}`,
      ]
    );

    // Commit the transaction
    await db.promise().commit();

    res.json({ 
      message: `Help request ${status} successfully`,
      requestId: id,
      status: status
    });
  } catch (err) {
    await db.promise().rollback();
    console.error('Error updating help request:', err);
    res.status(500).json({ message: 'Error updating help request' });
  }
});

// Create new admin
router.post('/create', adminAuth, async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Can only create admin accounts' });
  }

  try {
    // Check if email already exists
    const [existing] = await db.promise().query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new admin user
    const [result] = await db.promise().query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );

    res.status(201).json({ 
      message: 'Admin created successfully',
      userId: result.insertId
    });
  } catch (err) {
    console.error('Error creating admin:', err);
    res.status(500).json({ message: 'Error creating admin' });
  }
});

module.exports = router;
