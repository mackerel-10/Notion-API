const mysql = require('mysql2/promise');

const db = mysql.createPool(process.env.MYSQL_URL);

db.on('connection', () => {
  console.log('MySQL connected!');
});
db.on('error', (error) => {
  console.error('MySQL failed', error);
});

exports.db = db;
