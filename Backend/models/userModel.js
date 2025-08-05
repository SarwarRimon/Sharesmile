const mysql = require('../db');

const User = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT id, name, email, role FROM users'; // Added role
      mysql.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      mysql.query(sql, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // includes role
        }
      });
    });
  },

  createUser: (name, email, password, role = 'user') => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
      mysql.query(sql, [name, email, password, role], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: result.insertId, name, email, role });
        }
      });
    });
  }
};

module.exports = User;
