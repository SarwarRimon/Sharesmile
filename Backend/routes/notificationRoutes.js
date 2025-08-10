const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');

// Get all notifications for the authenticated user
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const query = `
            SELECT * FROM notifications 
            WHERE user_id = ? 
            ORDER BY created_at DESC
        `;
        
        const [notifications] = await db.promise().query(query, [userId]);
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user.id;

        const query = `
            UPDATE notifications 
            SET is_read = true 
            WHERE id = ? AND user_id = ?
        `;
        
        await db.promise().query(query, [notificationId, userId]);
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ message: 'Error updating notification' });
    }
});

module.exports = router;
