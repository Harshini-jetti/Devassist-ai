import 'dotenv/config'; // loads your OPENAI_API_KEY from .env
import express from 'express';
import cors from 'cors';

import explainRoute from './routes/explain.js';
import debugRoute from './routes/debug.js';
import generateTestsRoute from './routes/generateTests.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());          // allows our React frontend to call this server
app.use(express.json());  // allows us to read JSON sent from the frontend

// simple "is the server alive" check
app.get('/', (req, res) => {
  res.json({ status: 'DevAssist AI backend is running' });
});

app.use('/api/explain', explainRoute);
app.use('/api/debug', debugRoute);
app.use('/api/generate-tests', generateTestsRoute);

app.listen(PORT, () => {
  console.log(`✅ DevAssist AI backend running on http://localhost:${PORT}`);
});