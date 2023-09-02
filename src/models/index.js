const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWD,
  database: process.env.MYSQL_DATABASE,
});

db.on('connection', () => console.log('MySQL connected!'));
db.on('error', (error) => {
  throw new Error(error);
});

module.exports = db;
