const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const adminRoutes = require("./routes/adminRoutes");

const db = require('./db');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/admin", adminRoutes); // Admin routes

// 🔐 Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Login first' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Routes
app.use('/api', contactRoutes);
app.use('/api/auth', authRoutes);




// User Profile Update Route
app.put('/api/user/update/:field', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { field } = req.params;
  const value = req.body[field];

  if (!['address', 'mobile', 'department', 'batch'].includes(field)) {
    return res.status(400).json({ message: 'Invalid field' });
  }

  try {
    const [results] = await db.promise().query(`UPDATE users SET ${field} = ? WHERE id = ?`, [value, userId]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or field not updated' });
    }

    res.json({ message: `${field} updated successfully!` });
  } catch (err) {
    console.error('Error updating user data:', err);
    res.status(500).json({ message: 'Error updating user data' });
  }
});

// Delete user info
app.delete('/api/user/delete/:field', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { field } = req.params;

  if (!['address', 'mobile'].includes(field)) {
    return res.status(400).json({ message: 'Invalid field. Cannot delete department or batch.' });
  }

  try {
    const [results] = await db.promise().query(`UPDATE users SET ${field} = NULL WHERE id = ?`, [userId]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or field not deleted' });
    }

    res.json({ message: `${field} deleted successfully!` });
  } catch (err) {
    console.error('Error deleting user data:', err);
    res.status(500).json({ message: 'Error deleting user data' });
  }
});

// 💰 Create Donation (Protected)
app.post('/api/donations', authenticateToken, async (req, res) => {
  const { amount, campaign, paymentMethod } = req.body;
  const userId = req.user.id;

  if (!amount || !campaign || !paymentMethod) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }

  try {
    const [results] = await db.promise().query(
      'INSERT INTO donations (user_id, amount, campaign_name, method) VALUES (?, ?, ?, ?)',
      [userId, amount, campaign, paymentMethod]
    );

    if (results.affectedRows === 0) {
      return res.status(500).json({ message: 'Donation failed' });
    }

    res.status(200).json({ message: 'Donation submitted successfully!' });
  } catch (err) {
    console.error('Donation error:', err);
    res.status(500).json({ message: 'Server error while processing donation' });
  }
});

// 👤 User Dashboard/Profile (Protected)
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching user data' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ user: results[0] });
  });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
