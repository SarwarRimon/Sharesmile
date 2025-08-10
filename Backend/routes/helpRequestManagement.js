const express = require('express');
const router = express.Router();
const db = require('../db');
const adminAuth = require('../middleware/adminAuth');

// Get all help requests
router.get('/help-requests', adminAuth, async (req, res) => {
  try {
    console.log('Fetching help requests...'); // Debug log
    const [rows] = await db.promise().query(`
      SELECT hr.*, u.name as user_name, u.email as user_email 
      FROM help_requests hr 
      JOIN users u ON hr.user_id = u.id 
      ORDER BY hr.created_at DESC
    `);
    console.log('Found help requests:', rows.length); // Debug log
    res.json(rows);
  } catch (err) {
    console.error('Error fetching help requests:', err);
    res.status(500).json({ message: 'Error fetching help requests' });
  }
});

// Update help request status
router.put('/help-requests/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let connection;

  console.log('Received status update request:', { id, status }); // Debug log

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    // Get a connection and start transaction
    connection = await db.promise();
    await connection.beginTransaction();
    console.log('Transaction started'); // Debug log

    // Update help request status
    const [result] = await connection.query(
      'UPDATE help_requests SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    console.log('Update result:', result); // Debug log

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Help request not found' });
    }

    // Get help request details with user information
    const [requestData] = await connection.query(
      `SELECT hr.*, u.name as requester_name, u.email 
       FROM help_requests hr 
       JOIN users u ON hr.user_id = u.id 
       WHERE hr.id = ?`,
      [id]
    );

    console.log('Request data found:', requestData[0]); // Debug log

    if (requestData.length > 0) {
      const request = requestData[0];

      // If status is approved, create a campaign
      if (status === 'approved') {
        try {
          // Create campaign
          const [campaignResult] = await connection.query(
            `INSERT INTO campaigns (
              title,
              description,
              required_amount,
              document_path,
              help_request_id,
              requester_id,
              status
            ) VALUES (?, ?, ?, ?, ?, ?, 'active')`,
            [
              request.title,
              request.description,
              request.amount,
              request.document_path,
              request.id,
              request.user_id
            ]
          );
          console.log('Campaign created:', campaignResult);
        } catch (campaignErr) {
          console.error('Error creating campaign:', campaignErr);
          await connection.rollback();
          return res.status(500).json({ message: 'Error creating campaign' });
        }
      }

      try {
        // Create notification
        await connection.query(
          'INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, NOW())',
          [
            request.user_id,
            `Your help request "${request.title}" has been ${status}`,
          ]
        );
        console.log('Notification created'); // Debug log
      } catch (notifErr) {
        console.error('Error creating notification:', notifErr);
        // Continue even if notification fails
      }
    }

    // Commit the transaction
    await connection.commit();
    console.log('Transaction committed'); // Debug log

    res.json({ 
      message: `Help request ${status} successfully`,
      requestId: id,
      status: status,
      notification: 'Notification sent to user'
    });
  } catch (err) {
    console.error('Error in status update transaction:', err);
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackErr) {
        console.error('Error rolling back:', rollbackErr);
      }
    }
    res.status(500).json({ 
      message: 'Error updating help request',
      error: err.message 
    });
  }
});

module.exports = router;
