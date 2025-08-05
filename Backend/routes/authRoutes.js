const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure correct import
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route for user registration (SignUp)
router.post('/signup', registerUser);

// Route for user login (LogIn)
router.post('/login', loginUser);

module.exports = router;
