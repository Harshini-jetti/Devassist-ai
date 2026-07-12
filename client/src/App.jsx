import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ToolSelectionCards from './components/ToolSelectionCards';
import CodeEditor from './components/CodeEditor';
import ResultCard from './components/ResultCard';
import Auth from './components/Auth';
import { explainCode, debugError, generateTests } from './api';
import { supabase } from './supabaseClient';

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = checking, null = logged out, object = logged in

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [mode, setMode] = useState('explain');
  const [code, setCode] = useState(`function calculateDiscount(price, discount) {
  if (discount < 0 || discount > 100) {
    throw new Error("Invalid discount");
  }

  return price - (price * discount) / 100;
}`);
  const [errorMessage, setErrorMessage] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  async function handleSubmit() {
    setApiError('');
    setResult(null);
    if (!code.trim()) { setApiError('Please paste some code first.'); return; }
    if (mode === 'debug' && !errorMessage.trim()) { setApiError('Please paste the error message too.'); return; }

    setLoading(true);
    try {
      let data;
      if (mode === 'explain') data = await explainCode(code);
      else if (mode === 'debug') data = await debugError(code, errorMessage);
      else if (mode === 'tests') data = await generateTests(code, language);
      setResult(data);
    } catch (err) {
      console.error('handleSubmit error:', err);
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    setResult(null);
    setApiError('');
    setCode('');
    setErrorMessage('');
  }

  const features = ['Explain Code', 'Debug Errors', 'Generate Tests', 'AI Powered', 'Secure Backend'];

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[var(--color-accent)]" />
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        <section className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
            Understand Code. Fix Bugs. <span className="text-[var(--color-accent)]">Ship Faster.</span>
          </h2>
          <p className="text-[var(--color-text-dim)] mt-5 max-w-xl text-base sm:text-lg leading-relaxed">
            Analyze unfamiliar code, diagnose runtime errors, review code quality, and
            generate production-ready unit tests using AI — all in one developer workspace.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-5 text-xs font-mono text-[var(--color-text-dim)]">
            {features.map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="text-[var(--color-accent)]">✓</span>{f}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-mono mb-3">Developer Tools</p>
          <ToolSelectionCards selected={mode} onSelect={handleModeChange} />
        </section>

        <section className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-mono">Code Workspace</p>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'Python', 'AI Powered', 'Secure'].map((chip) => (
                <span key={chip} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-dim)]">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <CodeEditor value={code} onChange={setCode} language={language} />

            {mode === 'debug' && (
              <textarea
                placeholder="Paste the error message here..."
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                className="w-full h-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 text-sm font-mono resize-none focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            )}

            {mode === 'tests' && (
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--color-accent)] transition-colors cursor-pointer"
              >
                <option value="javascript">JavaScript (Jest)</option>
                <option value="python">Python (PyTest)</option>
              </select>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold px-6 py-3 rounded-lg text-sm shadow-lg shadow-[var(--color-accent)]/20 hover:bg-[var(--color-accent-dim)] hover:shadow-xl hover:shadow-[var(--color-accent)]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  Analyze Code
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </section>

        {apiError && (
          <div className="border border-red-500/40 bg-red-500/10 text-red-300 text-sm rounded-lg p-3 mb-8">
            {apiError}
          </div>
        )}

        <section ref={resultRef}>
          <ResultCard mode={mode} data={result} loading={loading} />
        </section>
      </main>
      <Footer />
    </div>
  );
}