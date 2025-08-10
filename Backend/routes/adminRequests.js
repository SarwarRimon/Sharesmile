const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');

// ✅ Only allow admin (you can expand this check)
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
}

// 📌 Get all pending requests
router.get('/pending', authenticateToken, requireAdmin, (req, res) => {
  const sql = 'SELECT * FROM help_requests WHERE status = "pending" ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching pending requests:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

  // 📌 Approve or Reject request
router.put('/:id/status', authenticateToken, requireAdmin, (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'
  const { id } = req.params;

  // Start a transaction
  db.beginTransaction(async (err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    try {
      // First update the request status
      const updateSql = 'UPDATE help_requests SET status = ?, updated_at = NOW() WHERE id = ?';
      await db.query(updateSql, [status, id]);

      // If request is approved, create a campaign
      if (status === 'approved') {
        // Get help request details with user information
        const getRequestSql = `
          SELECT hr.*, u.name as requester_name 
          FROM help_requests hr
          JOIN users u ON hr.user_id = u.id 
          WHERE hr.id = ?
        `;
        db.query(getRequestSql, [id], (err, requests) => {
          if (err || requests.length === 0) {
            db.rollback(() => {
              console.error('Error fetching help request:', err);
              res.status(500).json({ message: 'Database error' });
            });
            return;
          }

          const request = requests[0];
          // Create campaign with formatted title
          const campaignTitle = `${request.title} - Help Request from ${request.requester_name}`;
          const createCampaignSql = `
            INSERT INTO campaigns (
              title,
              description,
              required_amount,
              current_amount,
              document_path,
              help_request_id,
              requester_id,
              status
            ) VALUES (?, ?, ?, 0, ?, ?, ?, 'active')
          `;
          
          db.query(createCampaignSql, [
            campaignTitle,
            request.description,
            request.amount,
            request.document_path,
            request.id,
            request.user_id
          ], (err, result) => {
            if (err) {
              db.rollback(() => {
                console.error('Error creating campaign:', err);
                res.status(500).json({ message: 'Error creating campaign' });
              });
              return;
            }

            // Commit the transaction
            db.commit(err => {
              if (err) {
                db.rollback(() => {
                  console.error('Error committing transaction:', err);
                  res.status(500).json({ message: 'Database error' });
                });
                return;
              }
              // Success response with campaign details
              res.json({ 
                message: 'Help request approved and campaign created successfully',
                requestId: id,
                campaignId: result.insertId,
                status: 'approved'
              });
              }
              res.json({ 
                message: `Request ${status} successfully${status === 'approved' ? ' and campaign created' : ''}` 
              });
            });
          });
        });
      } else {
        // If rejected, just commit the status update
        db.commit(err => {
          if (err) {
            db.rollback(() => {
              console.error('Error committing transaction:', err);
              res.status(500).json({ message: 'Database error' });
            });
            return;
          }
          res.json({ message: `Request ${status} successfully` });
        });
      }
    });
  });
});module.exports = router;
