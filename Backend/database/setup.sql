-- Create campaigns table if not exists
CREATE TABLE IF NOT EXISTS campaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    required_amount DECIMAL(10, 2) NOT NULL,
    current_amount DECIMAL(10, 2) DEFAULT 0,
    document_path VARCHAR(255),
    help_request_id INT,
    requester_id INT NOT NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(id),
    FOREIGN KEY (help_request_id) REFERENCES help_requests(id)
);

-- Create donations table if not exists
CREATE TABLE IF NOT EXISTS donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_id INT NOT NULL,
    donor_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('bKash', 'Rocket', 'Nagad', 'Bank Transfer') NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
    FOREIGN KEY (donor_id) REFERENCES users(id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_campaign_id ON donations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_donor_id ON donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_created_at ON donations(created_at);
