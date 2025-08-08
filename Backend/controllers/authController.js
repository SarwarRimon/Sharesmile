const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to handle user registration (SignUp)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body; // Accept role if provided, default to 'user'

    // Check if user already exists
    const existingUser = await User.findByEmail(email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to database with role
    const newUser = await User.createUser(name, email.toLowerCase(), hashedPassword, role);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to handle user login (LogIn)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user from DB
    const user = await User.findByEmail(email.toLowerCase());
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with role
    const token = jwt.sign(
      { id: user.id, role: user.role }, // include role in token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
