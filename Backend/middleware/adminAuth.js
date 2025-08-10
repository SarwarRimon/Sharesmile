const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Error in admin auth middleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
