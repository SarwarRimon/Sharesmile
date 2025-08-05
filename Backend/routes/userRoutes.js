const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const User = require("../models/User");

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "full_name", "email", "department", "batch", "address", "mobile"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update editable fields (address, mobile, department, batch)
router.put("/update/:field", authenticateToken, async (req, res) => {
  const { field } = req.params;
  const { value } = req.body;

  const allowedFields = ["address", "mobile", "department", "batch"];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Invalid field" });
  }

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user[field] = value;
    await user.save();

    res.json({ message: `${field} updated successfully!` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete optional fields (set to null)
router.delete("/delete/:field", authenticateToken, async (req, res) => {
  const { field } = req.params;

  const allowedFields = ["address", "mobile", "department", "batch"];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Invalid field" });
  }

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user[field] = null;
    await user.save();

    res.json({ message: `${field} deleted successfully!` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
