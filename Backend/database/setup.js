const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');
const config = require('../config/db.config.js');

async function setupDatabase() {
    let connection;
    try {
        // Create connection
        connection = await mysql.createConnection(config);
        console.log('Connected to MySQL database');

        // Read the SQL setup file
        const sqlPath = path.join(__dirname, 'setup.sql');
        const sqlContent = await fs.readFile(sqlPath, 'utf8');

        // Split the SQL file into individual statements
        const statements = sqlContent
            .split(';')
            .filter(stmt => stmt.trim())
            .map(stmt => stmt.trim());

        // Execute each statement
        for (const statement of statements) {
            try {
                await connection.query(statement);
                console.log('Successfully executed:', statement.substring(0, 50) + '...');
            } catch (err) {
                console.error('Error executing statement:', statement);
                console.error('Error details:', err);
            }
        }

        console.log('Database setup completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Database setup failed:', err);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

setupDatabase();
