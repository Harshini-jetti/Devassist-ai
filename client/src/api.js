// api.js — all functions that talk to our backend live here

const API_BASE = 'http://localhost:5000/api';

async function callApi(endpoint, body) {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    // backend sends { error: "..." } on failure — surface that message
    throw new Error(data.error || 'Something went wrong.');
  }

  return data;
}

export function explainCode(code) {
  return callApi('explain', { code });
}

export function debugError(code, errorMessage) {
  return callApi('debug', { code, errorMessage });
}

export function generateTests(code, language) {
  return callApi('generate-tests', { code, language });
}