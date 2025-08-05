const Message = require('../models/ContactModel');

const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMessage = await Message.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

module.exports = { sendMessage };
