const path = require('path')
const mysql = require('mysql')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message, err.stack);
  } else {
    console.log("Database connected...");
  }
});

module.exports = db;
