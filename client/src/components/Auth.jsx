import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { LogIn, UserPlus, Loader2, TerminalSquare, Sparkles, Bug, TestTube2 } from 'lucide-react';

const FEATURES = [
  { Icon: Sparkles, text: 'Understand any codebase instantly' },
  { Icon: Bug, text: 'Debug errors with AI root-cause analysis' },
  { Icon: TestTube2, text: 'Auto-generate production-ready tests' },
];

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Account created! Check your email to confirm, then log in.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding, hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[var(--color-surface)] border-r border-[var(--color-border)]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, rgba(232, 163, 61, 0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(232, 163, 61, 0.1), transparent 50%)',
          }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg)]">
              <TerminalSquare size={20} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              DevAssist <span className="text-[var(--color-accent)]">AI</span>
            </h1>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight leading-tight mb-6">
              Your AI pair programmer for understanding, fixing, and testing code.
            </h2>
            <div className="space-y-4">
              {FEATURES.map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-[var(--color-text-dim)]">
                  <div className="w-8 h-8 rounded-lg bg-black/30 border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[var(--color-accent)]" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-[var(--color-text-dim)] font-mono">
            Built with React · Node.js · Gemini API
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="w-9 h-9 rounded-md bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg)]">
              <TerminalSquare size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">
              DevAssist <span className="text-[var(--color-accent)]">AI</span>
            </h1>
          </div>

          <div className="mb-7">
            <h2 className="text-2xl font-bold tracking-tight">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-sm text-[var(--color-text-dim)] mt-1.5">
              {mode === 'login'
                ? 'Log in to access your developer workspace'
                : 'Start using AI-powered developer tools in seconds'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-dim)] mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--color-text-dim)] mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
              />
            </div>

            {error && (
              <div className="text-red-300 text-xs bg-red-500/10 border border-red-500/40 rounded-lg p-3 leading-relaxed">
                {error}
              </div>
            )}
            {message && (
              <div className="text-emerald-300 text-xs bg-emerald-500/10 border border-emerald-500/40 rounded-lg p-3 leading-relaxed">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold px-4 py-3 rounded-lg text-sm shadow-lg shadow-[var(--color-accent)]/20 hover:bg-[var(--color-accent-dim)] hover:shadow-xl hover:shadow-[var(--color-accent)]/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-1"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : mode === 'login' ? (
                <><LogIn size={16} /> Log In</>
              ) : (
                <><UserPlus size={16} /> Create Account</>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[var(--color-text-dim)] mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setMessage(''); }}
              className="text-[var(--color-accent)] hover:underline cursor-pointer font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}