const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'notion',
});

db.on('connection', () => console.log('MySQL connected!'));
db.on('error', (error) => {
  throw new Error(error);
});

module.exports = db;
