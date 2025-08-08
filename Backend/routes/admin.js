// routes/admin.js or your relevant route file
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Require admin middleware or simple check inside
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
}

router.get('/profile', authenticateToken, requireAdmin, (req, res) => {
  // Assuming req.user has all the admin info after token verification
  const { id, name, email, role, department } = req.user; // adjust fields as per your user object
  res.json({ id, name, email, role, department });
});

module.exports = router;
