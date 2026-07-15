# DevAssist AI

**Understand Code. Fix Bugs. Ship Faster.**

DevAssist AI is an AI-powered developer productivity platform that helps developers understand unfamiliar codebases, debug runtime errors with root-cause analysis, and auto-generate production-ready unit tests — all in one workspace.

🔗 **Live App:** [devassist-ai-three.vercel.app](https://devassist-ai-three.vercel.app)

---

## Features

- 🧠 **Understand Code** — Analyzes architecture, logic flow, key concepts, and complexity of any pasted code snippet.
- 🐛 **Debug & Resolve** — Identifies root causes of runtime/logic errors, suggests fixes, and generates corrected code.
- ✅ **Generate Tests** — Creates production-ready Jest / PyTest unit tests, including edge cases.
- 🔐 **Secure Authentication** — Email/password auth with email confirmation, plus Google Sign-In (OAuth), powered by Supabase Auth.
- ⚡ **AI Engine** — Built on Google's Gemini API for fast, structured code analysis.

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Deployed on Vercel

**Backend**
- Node.js + Express
- Google Gemini API for AI analysis
- Deployed on Render

**Auth & Database**
- Supabase (Auth + email confirmation + Google OAuth)

---

## How It Works

1. User signs up / logs in (email or Google).
2. User pastes a code snippet into the workspace editor.
3. User selects a tool — Explain, Debug, or Generate Tests.
4. The request is sent to the Express backend, which builds a structured prompt and calls the Gemini API.
5. Gemini returns a structured JSON response (root cause, explanation, fix, corrected code, best practices, or generated test cases).
6. The frontend renders the AI's response in a clean, readable format.

---

## Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- A Supabase project (for auth)
- A Google Gemini API key

### 1. Clone the repo
git clone https://github.com/Harshini-jetti/Devassist-ai.git
cd Devassist-ai

### 2. Set up the backend
cd server
npm install

Create a `.env` file in `/server`:
GEMINI_API_KEY=your_gemini_api_key

Run the server:
npm run dev

### 3. Set up the frontend
cd client
npm install

Create a `.env` file in `/client`:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
VITE_API_URL=http://localhost:5000

Run the frontend:
npm run dev

The app will be available at `http://localhost:5173`.

---

## Project Structure

Devassist-ai/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Auth, CodeEditor, ResultCard, etc.
│   │   └── App.jsx
│   └── .env
├── server/               # Node + Express backend
│   ├── routes/           # explain.js, debug.js, generateTests.js
│   ├── prompts/          # promptTemplates.js
│   └── index.js
└── README.md

---

## Roadmap

- [ ] Support for more languages (currently JavaScript & Python focused)
- [ ] Save analysis history per user
- [ ] Syntax highlighting improvements in the code editor
- [ ] Rate limiting / usage dashboard

---

## Author

Built by **Harshini Jetti** — Computer Science Engineering student.