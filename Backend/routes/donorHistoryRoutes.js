const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');

// Get donor's donation history
router.get('/donor-history', authenticateToken, async (req, res) => {
    try {
        const donorId = req.user.id;
        const query = `
            SELECT 
                d.*,
                c.title as campaign_title,
                c.description as campaign_description
            FROM donations d
            JOIN campaigns c ON d.campaign_id = c.id
            WHERE d.donor_id = ?
            ORDER BY d.created_at DESC
        `;

        const [donations] = await db.promise().query(query, [donorId]);
        res.json(donations);
    } catch (error) {
        console.error('Error fetching donor history:', error);
        res.status(500).json({ message: 'Error fetching donation history' });
    }
});

module.exports = router;
