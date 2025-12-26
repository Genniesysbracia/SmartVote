import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import users from './routes/users.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', users);

// Test route
app.get('/', (req, res) => {
  res.send('Voterly API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
