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

    // Get user information for notification
    const [requestData] = await connection.query(
      'SELECT hr.user_id, hr.title, u.email FROM help_requests hr JOIN users u ON hr.user_id = u.id WHERE hr.id = ?',
      [id]
    );

    console.log('Request data found:', requestData[0]); // Debug log

    if (requestData.length > 0) {
      try {
        // Create notification
        await connection.query(
          'INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, NOW())',
          [
            requestData[0].user_id,
            `Your help request "${requestData[0].title}" has been ${status}`,
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
