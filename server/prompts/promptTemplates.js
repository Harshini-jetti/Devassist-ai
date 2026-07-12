// promptTemplates.js
// This file holds all our AI prompts in one place.
// Each function builds a prompt that tells the AI exactly what to do
// and exactly what JSON format to reply in — this keeps every response
// consistent instead of random free text.

export function explainCodePrompt(code) {
  return `You are a Senior Software Engineer explaining code to a teammate.

Explain the following code clearly and concisely.

CODE:
${code}

Return ONLY valid JSON (no markdown, no extra text) in exactly this format:
{
  "summary": "one or two sentence high-level summary",
  "logic": "explanation of how the code works, step by step",
  "keyConcepts": ["concept1", "concept2"],
  "timeComplexity": "e.g. O(n)",
  "spaceComplexity": "e.g. O(1)",
  "codeQualityScore": {
    "overall": 85,
    "readability": 90,
    "maintainability": 80,
    "performance": 85,
    "bestPractices": 85
  },
  "improvements": ["suggestion1", "suggestion2"]
}`;
}

export function debugErrorPrompt(code, errorMessage) {
  return `You are a Senior Software Engineer helping debug an error.

CODE:
${code}

ERROR MESSAGE:
${errorMessage}

Return ONLY valid JSON (no markdown, no extra text) in exactly this format:
{
  "rootCause": "what is actually causing this error",
  "errorExplanation": "a short plain-English explanation of what the error message means",
  "fix": "how to fix it, explained simply",
  "correctedCode": "the corrected code as a string",
  "explanation": "why this fix works",
  "bestPractices": ["practice1", "practice2"]
}`;
}

export function generateTestsPrompt(code, language) {
  const framework = language === 'python' ? 'PyTest' : 'Jest';
  return `You are a Senior Software Engineer writing unit tests.

CODE:
${code}

Write unit tests for this code using ${framework}. Cover the normal case
AND at least one edge case.

Return ONLY valid JSON (no markdown, no extra text) in exactly this format:
{
  "framework": "${framework}",
  "testCode": "the full runnable test code as a string",
  "edgeCasesCovered": ["edge case 1", "edge case 2"],
  "coverageNotes": "a short note on what the tests cover and any gaps"
}`;
}