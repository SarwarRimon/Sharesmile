const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // your DB username
  password: 'root',   // your DB password
  database: 'helping_hand_foundations', // your DB name
});

connection.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
