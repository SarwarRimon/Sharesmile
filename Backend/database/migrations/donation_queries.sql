-- Common SQL queries for donations system

-- 1. Insert a new donation
INSERT INTO donations (campaign_id, donor_id, amount, payment_method, transaction_id, status)
VALUES (?, ?, ?, ?, ?, 'completed');

-- 2. Update campaign amount after donation
UPDATE campaigns 
SET current_amount = current_amount + ?
WHERE id = ?;

-- 3. Get donation history for a donor
SELECT 
    d.*,
    c.title as campaign_title,
    u.name as donor_name
FROM donations d
JOIN campaigns c ON d.campaign_id = c.id
JOIN users u ON d.donor_id = u.id
WHERE d.donor_id = ?
ORDER BY d.created_at DESC;

-- 4. Get donations received for a campaign
SELECT 
    d.*,
    u.name as donor_name,
    u.email as donor_email
FROM donations d
JOIN users u ON d.donor_id = u.id
WHERE d.campaign_id = ?
ORDER BY d.created_at DESC;

-- 5. Get total donations for a campaign
SELECT 
    campaign_id,
    COUNT(*) as total_donations,
    SUM(amount) as total_amount
FROM donations
WHERE status = 'completed'
GROUP BY campaign_id;

-- 6. Get active campaigns with their donation progress
SELECT 
    c.*,
    COUNT(d.id) as donation_count,
    COALESCE(SUM(d.amount), 0) as raised_amount,
    (COALESCE(SUM(d.amount), 0) / c.required_amount * 100) as progress_percentage
FROM campaigns c
LEFT JOIN donations d ON c.id = d.campaign_id AND d.status = 'completed'
WHERE c.status = 'active'
GROUP BY c.id;

-- 7. Get donor statistics
SELECT 
    u.id,
    u.name,
    COUNT(d.id) as total_donations,
    SUM(d.amount) as total_amount_donated
FROM users u
JOIN donations d ON u.id = d.donor_id
WHERE d.status = 'completed'
GROUP BY u.id;

-- 8. Get recent donations with campaign and donor details
SELECT 
    d.*,
    c.title as campaign_title,
    u.name as donor_name
FROM donations d
JOIN campaigns c ON d.campaign_id = c.id
JOIN users u ON d.donor_id = u.id
WHERE d.status = 'completed'
ORDER BY d.created_at DESC
LIMIT 10;
