const express = require("express");
const router = express.Router();
const db = require("../db"); // Your actual DB connection file

// Route to get the total funds raised
router.get("/total", async (req, res) => {
  try {
    // Query to calculate the sum of all donations
    const [rows] = await db.query("SELECT SUM(amount) AS totalDonation FROM donations");

    // Check if rows are returned and if totalDonation is not null
    if (rows && rows[0].totalDonation !== null) {
      return res.status(200).json({ totalDonation: rows[0].totalDonation });
    } else {
      // If no donations exist, return 0
      return res.status(200).json({ totalDonation: 0 });
    }
  } catch (err) {
    console.error("Error fetching total funds:", err);
    // Return error response if the query fails
    return res.status(500).json({ message: "Failed to fetch total funds." });
  }
});

module.exports = router;
