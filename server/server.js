import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';

import users from './routes/users.js';
import { setupWebSocket } from './websocket/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/users', users);

app.get('/', (_, res) => {
  res.send('Voterly API is running...');
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

setupWebSocket(wss); // 👈 ALL WS logic delegated

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
