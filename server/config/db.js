import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Explicitly set password to null if empty string or undefined
  password: process.env.DB_PASSWORD || null
};

const pool = mysql.createPool(dbConfig);

export default pool;
