const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');
const adminAuth = require('../middleware/adminAuth');

// Get all active campaigns
router.get('/active-campaigns', authenticateToken, adminAuth, async (req, res) => {
    try {
        const [campaigns] = await db.promise().query(`
            SELECT 
                c.*,
                u.name as requester_name,
                COUNT(d.id) as donation_count,
                (
                    SELECT COUNT(*) 
                    FROM donations 
                    WHERE campaign_id = c.id AND status = 'approved'
                ) as approved_donations
            FROM campaigns c
            LEFT JOIN users u ON c.requester_id = u.id
            LEFT JOIN donations d ON c.id = d.campaign_id
            WHERE c.status = 'active'
            GROUP BY c.id
            ORDER BY c.created_at DESC
        `);

        res.json(campaigns);
    } catch (error) {
        console.error('Error fetching active campaigns:', error);
        res.status(500).json({ message: 'Error fetching campaigns' });
    }
});

// Remove campaign
router.post('/remove-campaign/:campaignId', authenticateToken, adminAuth, async (req, res) => {
    const { campaignId } = req.params;

    try {
        // Start transaction
        await db.promise().beginTransaction();

        // 1. Get campaign details
        const [campaigns] = await db.promise().query(
            'SELECT * FROM campaigns WHERE id = ? AND status = "active"',
            [campaignId]
        );

        if (campaigns.length === 0) {
            await db.promise().rollback();
            return res.status(404).json({ message: 'Campaign not found or already inactive' });
        }

        const campaign = campaigns[0];

        // 2. Update campaign status to cancelled
        await db.promise().query(
            'UPDATE campaigns SET status = "cancelled" WHERE id = ?',
            [campaignId]
        );

        // 3. Get pending donations for this campaign
        const [pendingDonations] = await db.promise().query(
            'SELECT * FROM donations WHERE campaign_id = ? AND status = "pending"',
            [campaignId]
        );

        // 4. Update all pending donations to rejected
        if (pendingDonations.length > 0) {
            await db.promise().query(
                'UPDATE donations SET status = "rejected", rejection_reason = "Campaign has been cancelled by admin" WHERE campaign_id = ? AND status = "pending"',
                [campaignId]
            );

            // 5. Create notifications for donors with pending donations
            for (const donation of pendingDonations) {
                await db.promise().query(
                    'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
                    [
                        donation.donor_id,
                        `Your pending donation of ${donation.amount} for campaign "${campaign.title}" has been cancelled as the campaign was removed by admin.`
                    ]
                );
            }
        }

        // 6. Notify campaign owner
        await db.promise().query(
            'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
            [
                campaign.requester_id,
                `Your campaign "${campaign.title}" has been removed by admin.`
            ]
        );

        // Commit transaction
        await db.promise().commit();

        res.json({
            message: 'Campaign removed successfully',
            campaignId: campaignId
        });

    } catch (error) {
        await db.promise().rollback();
        console.error('Error removing campaign:', error);
        res.status(500).json({ message: 'Error removing campaign' });
    }
});

module.exports = router;
