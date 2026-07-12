import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateTestsPrompt } from '../prompts/promptTemplates.js';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-3.1-flash-lite',
  generationConfig: { responseMimeType: 'application/json' },
});

router.post('/', async (req, res) => {
  const { code, language } = req.body;

  if (!code || code.trim() === '') {
    return res.status(400).json({ error: 'Please paste a function first.' });
  }

  try {
    const prompt = generateTestsPrompt(code, language || 'javascript');

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      console.error('AI returned invalid JSON:', raw);
      return res.status(502).json({ error: 'AI response could not be processed. Please try again.' });
    }

    return res.json(parsed);

  } catch (err) {
    console.error('Gemini API error:', err.message);
    return res.status(500).json({ error: 'Something went wrong calling the AI. Please try again.' });
  }
});

export default router;