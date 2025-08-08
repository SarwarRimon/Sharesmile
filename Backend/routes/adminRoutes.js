const express = require('express');
const db = require('../db');
const router = express.Router();
const bcrypt = require('bcrypt');
const adminAuth = require('../middleware/adminAuth');

// Get all statistics for admin dashboard
router.get('/statistics', adminAuth, async (req, res) => {
  try {
    // Get total donations
    const [donationsResult] = await db.promise().query(
      'SELECT COALESCE(SUM(amount), 0) as totalDonations FROM donations'
    );

    // Get total help requests and status counts
    const [requestsResult] = await db.promise().query(
      `SELECT 
        COUNT(*) as total_requests,
        COUNT(CASE WHEN status = 'approved' OR status = 'Approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'rejected' OR status = 'Rejected' THEN 1 END) as rejected,
        COUNT(CASE WHEN status IS NULL OR status = 'pending' THEN 1 END) as pending
       FROM help_requests`
    );

    // Get total users and role counts
    const [usersResult] = await db.promise().query(
      `SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin,
        COUNT(CASE WHEN role = 'helpseeker' THEN 1 END) as helpseeker
       FROM users`
    );

    // Count pending requests (null or 'pending' status)
    const [pendingResult] = await db.promise().query(
      `SELECT COUNT(*) as count 
       FROM help_requests 
       WHERE status IS NULL OR status = 'pending'`
    );

    // Format the response
    res.json({
      totalDonations: donationsResult[0].totalDonations || 0,
      helpRequests: {
        approved: requestsResult[0].approved || 0,
        rejected: requestsResult[0].rejected || 0,
        pending: requestsResult[0].pending || 0,
        total: requestsResult[0].total_requests || 0
      },
      users: {
        admin: usersResult[0].admin || 0,
        helpseeker: usersResult[0].helpseeker || 0,
        total: usersResult[0].total_users || 0
      },
      pendingRequests: pendingResult[0].count || 0
    });
  } catch (err) {
    console.error('Error fetching admin statistics:', err);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

// Get admin profile with complete information
router.get('/profile', adminAuth, async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM users WHERE id = ? AND role = "admin"',
      [req.user.id]
    );
    
    if (rows.length > 0) {
      // Remove sensitive information
      const { password, ...adminData } = rows[0];
      res.json(adminData);
    } else {
      res.status(404).json({ message: 'Admin profile not found' });
    }
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ message: 'Error fetching admin profile' });
  }
});

// Update admin profile
router.put('/profile', adminAuth, async (req, res) => {
  try {
    const { name, phone, address, bio, designation, department } = req.body;
    
    await db.promise().query(
      `UPDATE users 
       SET name = ?, 
           phone = ?, 
           address = ?, 
           bio = ?, 
           designation = ?, 
           department = ?
       WHERE id = ? AND role = "admin"`,
      [name, phone, address, bio, designation, department, req.user.id]
    );
    
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating admin profile:', err);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get all users 
router.get('/users', adminAuth, async (req, res) => {
  try {
    // Simple query to get all users
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Error fetching users' });
      }
      res.json(results);
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Create new admin
router.post('/create', adminAuth, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email exists
    const [existing] = await db.promise().query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    await db.promise().query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'admin']
    );

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    console.error('Error creating admin:', err);
    res.status(500).json({ message: 'Error creating admin' });
  }
});

module.exports = router;
