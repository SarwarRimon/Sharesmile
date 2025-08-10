-- Add rejection_reason column and update status enum
ALTER TABLE donations 
MODIFY COLUMN status ENUM('pending', 'approved', 'rejected', 'failed') DEFAULT 'pending',
ADD COLUMN rejection_reason TEXT NULL AFTER status;
