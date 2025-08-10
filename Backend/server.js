const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authenticateToken');

require('dotenv').config();
const adminRoutes = require("./routes/adminRoutes");
const path = require('path');

const db = require('./db');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const helpRequestRoutes = require('./routes/helpRequestRoutes');
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());



// Routes
app.use('/api', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // Admin routes with statistics
app.use('/api/admin', require('./routes/helpRequestManagement')); // Help request management routes
app.use('/api/campaigns', require('./routes/campaignRoutes')); // Campaign routes
app.use('/api/donations', require('./routes/donationRoutes')); // Donation routes



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


// 👤 User Dashboard/Profile (Protected)
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching user data' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ user: results[0] });
  });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/help-requests', helpRequestRoutes);


// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
