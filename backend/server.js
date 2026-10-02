import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const host = process.env.HOST || '127.0.0.1';

app.use(cors());
app.use(express.json({ limit: '8mb' }));
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send({ status: 'ok', message: 'AI Krishi Mitra backend is running.' });
});

app.listen(port, host, () => {
  console.log(`Backend listening on http://${host}:${port}`);
});
