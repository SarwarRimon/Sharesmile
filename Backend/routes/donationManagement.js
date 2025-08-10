const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');
const adminAuth = require('../middleware/adminAuth');

// Get all pending donations
router.get('/pending-donations', authenticateToken, adminAuth, async (req, res) => {
    try {
        // First verify that required tables exist
        const checkTables = `
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = '${process.env.DB_NAME}' 
            AND table_name IN ('donations', 'campaigns', 'users')
        `;
        const [tables] = await db.promise().query(checkTables);
        
        if (tables.length < 3) {
            console.error('Missing required tables:', tables);
            return res.status(500).json({ message: 'Database schema not properly set up' });
        }

        const query = `
            SELECT 
                d.id,
                d.amount,
                d.payment_method,
                d.transaction_id,
                d.status,
                d.created_at,
                c.title as campaign_title,
                u.name as donor_name,
                c.requester_id as campaign_owner_id 
            FROM donations d
            LEFT JOIN campaigns c ON d.campaign_id = c.id
            LEFT JOIN users u ON d.donor_id = u.id
            WHERE d.status = 'pending'
            ORDER BY d.created_at DESC
        `;
        
        const [results] = await db.promise().query(query);
        
        if (!results) {
            return res.status(404).json({ message: 'No pending donations found' });
        }

        console.log('Fetched pending donations:', results); // Debug log
        res.json(results);
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState,
            errno: error.errno
        });
        res.status(500).json({ 
            message: 'Error fetching pending donations',
            details: error.sqlMessage || error.message
        });
    }
});

// Approve donation
router.post('/approve-donation/:donationId', authenticateToken, adminAuth, async (req, res) => {
    const donationId = req.params.donationId;

    try {
        // Start transaction
        await db.promise().beginTransaction();

        // 1. Get donation details
        const [donations] = await db.promise().query(
            'SELECT * FROM donations WHERE id = ? AND status = "pending"',
            [donationId]
        );

        if (donations.length === 0) {
            await db.promise().rollback();
            return res.status(404).json({ message: 'Donation not found or already processed' });
        }

        const donation = donations[0];

        // 2. Update campaign total amount
        const [updateResult] = await db.promise().query(
            'UPDATE campaigns SET current_amount = current_amount + ? WHERE id = ?',
            [donation.amount, donation.campaign_id]
        );

        if (updateResult.affectedRows === 0) {
            await db.promise().rollback();
            return res.status(404).json({ message: 'Campaign not found' });
        }

        // 3. Update donation status to approved
        await db.promise().query(
            'UPDATE donations SET status = "approved" WHERE id = ?',
            [donationId]
        );

        // 4. Get campaign owner details
        const [campaigns] = await db.promise().query(
            'SELECT c.*, u.name as campaign_owner_name FROM campaigns c JOIN users u ON c.requester_id = u.id WHERE c.id = ?',
            [donation.campaign_id]
        );

        // 5. Create notification for campaign owner
        await db.promise().query(
            'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
            [
                campaigns[0].requester_id,
                `Your campaign "${campaigns[0].title}" has received a donation of ${donation.amount} which has been approved.`
            ]
        );

        // Commit transaction
        await db.promise().commit();

        res.json({ 
            message: 'Donation approved successfully',
            donationId: donationId,
            campaignId: donation.campaign_id,
            amount: donation.amount
        });

    } catch (error) {
        await db.promise().rollback();
        console.error('Error approving donation:', error);
        res.status(500).json({ message: 'Error processing donation approval' });
    }
});

// Reject donation
router.post('/reject-donation/:donationId', authenticateToken, adminAuth, async (req, res) => {
    const donationId = req.params.donationId;
    const { reason } = req.body;

    try {
        // Start transaction
        await db.promise().beginTransaction();

        // 1. Get donation details
        const [donations] = await db.promise().query(
            'SELECT * FROM donations WHERE id = ? AND status = "pending"',
            [donationId]
        );

        if (donations.length === 0) {
            await db.promise().rollback();
            return res.status(404).json({ message: 'Donation not found or already processed' });
        }

        const donation = donations[0];

        // 2. Update donation status to rejected
        await db.promise().query(
            'UPDATE donations SET status = "rejected", rejection_reason = ? WHERE id = ?',
            [reason, donationId]
        );

        // 3. Create notification for donor
        await db.promise().query(
            'INSERT INTO notifications (user_id, message, type) VALUES (?, ?, "donation_rejected")',
            [
                donation.donor_id,
                `Your donation of ${donation.amount} has been rejected. Reason: ${reason}`
            ]
        );

        // Commit transaction
        await db.promise().commit();

        res.json({ 
            message: 'Donation rejected successfully',
            donationId: donationId
        });

    } catch (error) {
        await db.promise().rollback();
        console.error('Error rejecting donation:', error);
        res.status(500).json({ message: 'Error processing donation rejection' });
    }
});

module.exports = router;
