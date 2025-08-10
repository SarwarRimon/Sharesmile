const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require('../middleware/authenticateToken');

// Apply authenticateToken middleware to all routes
router.use(authenticateToken);

// Get all donations with required fields
router.get('/list', (req, res) => {
  const sql = `SELECT d.id, c.title, d.amount, u.name AS donor_name, d.payment_method, d.transaction_id, d.status
              FROM donations d
              JOIN campaigns c ON d.campaign_id = c.id
              JOIN users u ON d.donor_id = u.id
              ORDER BY d.created_at DESC`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching donations:', err);
      return res.status(500).json({ message: 'Error fetching donations' });
    }
    res.json(rows);
  });
});

// Create a new donation
router.post('/create', (req, res) => {
  const { campaign_id, donor_id, amount, payment_method, transaction_id } = req.body;

  // Validate required fields
  if (!campaign_id || !donor_id || !amount || !payment_method || !transaction_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Verify donor_id matches authenticated user
  if (donor_id !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized donation attempt' });
  }

  // Insert donation
  const insertSql = `INSERT INTO donations 
    (campaign_id, donor_id, amount, payment_method, transaction_id, status) 
    VALUES (?, ?, ?, ?, ?, 'pending')`;

  db.query(
    insertSql, 
    [campaign_id, donor_id, amount, payment_method, transaction_id],
    (err, result) => {
      if (err) {
        console.error('Error creating donation:', err);
        return res.status(500).json({ message: 'Error saving donation' });
      }

      res.status(201).json({
        message: 'Donation successful',
        donation: {
          id: result.insertId,
          campaign_id,
          donor_id,
          amount,
          payment_method,
          transaction_id,
          status: 'pending'
        }
      });
    }
  );
});

// Create a new donation
router.post("/create", authenticateToken, (req, res) => {
  const { campaign_id, amount, payment_method, transaction_id } = req.body;
  const donor_id = req.user.id; // Get donor_id from authenticated user
  const status = 'pending'; // Initial status is pending

  // Insert the donation
  const sql = `
    INSERT INTO donations (
      campaign_id,
      donor_id,
      amount,
      payment_method,
      transaction_id,
      status
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [campaign_id, donor_id, amount, payment_method, transaction_id, status], (err, result) => {
    if (err) {
      console.error('Error creating donation:', err);
      return res.status(500).json({ message: "Failed to create donation" });
    }

    res.status(201).json({
      message: "Donation created successfully",
      donationId: result.insertId
    });
  });
});

// Get total funds raised
router.get("/total", (req, res) => {
  const sql = "SELECT SUM(amount) AS totalDonation FROM donations WHERE status = 'completed'";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching total funds:", err);
      return res.status(500).json({ message: "Failed to fetch total funds" });
    }
    
    const totalDonation = results[0].totalDonation || 0;
    res.json({ totalDonation });
  });
});

// Get all donations with campaign and donor details
router.get("/list", authenticateToken, (req, res) => {
  const sql = `
    SELECT 
      d.id,
      c.title as campaign_title,
      d.amount,
      u.name as donor_name,
      d.payment_method,
      d.transaction_id,
      d.status,
      d.created_at
    FROM donations d
    JOIN campaigns c ON d.campaign_id = c.id
    JOIN users u ON d.donor_id = u.id
    ORDER BY d.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching donations:', err);
      return res.status(500).json({ message: "Failed to fetch donations" });
    }

    res.json(results);
  });
});

module.exports = router;
