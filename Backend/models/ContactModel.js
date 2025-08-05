const mysql = require('../db');

const Message = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
      mysql.query(sql, [data.name, data.email, data.message], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: result.insertId, ...data });
        }
      });
    });
  }
};

module.exports = Message;
