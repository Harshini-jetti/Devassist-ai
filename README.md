# DevAssist AI

**Understand Code. Fix Bugs. Ship Faster.**

DevAssist AI is an AI-powered developer productivity platform that helps developers understand unfamiliar codebases, debug runtime errors with root-cause analysis, and auto-generate production-ready unit tests — all in one workspace.

🔗 **Live App:** [devassist-ai-three.vercel.app](https://devassist-ai-three.vercel.app)

---
## Screenshots

### Authentication
![Login Page](./screenshots/login-page.png)
![Signup Page](./screenshots/signup-page.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### AI Tools in Action
![Explain Code 1](./screenshots/explain-result-1.png)
![Explain Code 2](./screenshots/explain-result-2.png)
![Debug & Resolve 1](./screenshots/debug-result-1.png)
![Debug & Resolve 2](./screenshots/debug-result-2.png)
![Generate Tests 1](./screenshots/test-result-1.png)
![Generate Tests 2](./screenshots/test-result-2.png)

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

## Author

Built by **Harshini Jetti** — Computer Science Engineering student.