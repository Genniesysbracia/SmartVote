import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();

// Get all users (FROM profiles table)
router.get('/', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, full_name, email, date_of_birth FROM profiles');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { full_name, email, password, date_of_birth } = req.body;
    
    // Basic validation
    if (!full_name || !email || !password || !date_of_birth) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const [existingUsers] = await pool.query('SELECT * FROM profiles WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hashed password
    const [result] = await pool.query(
      'INSERT INTO profiles (full_name, email, password, date_of_birth) VALUES (?, ?, ?, ?)',
      [full_name, email, hashedPassword, date_of_birth]
    );

    // Return user data without password
    const newUser = {
      id: result.insertId,
      full_name,
      email,
      date_of_birth
    };

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

export default router;
