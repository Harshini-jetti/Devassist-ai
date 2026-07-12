import { useState, useEffect } from 'react';
import { TerminalSquare, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Header({ session }) {
  const [status, setStatus] = useState('checking'); // checking | online | offline

  useEffect(() => {
    fetch('https://devassist-ai-backend-cvyk.onrender.com/')
      .then((res) => (res.ok ? setStatus('online') : setStatus('offline')))
      .catch(() => setStatus('offline'));
  }, []);

  const statusConfig = {
    checking: { color: 'bg-yellow-400', label: 'Connecting...' },
    online: { color: 'bg-emerald-400', label: 'AI Engine Online' },
    offline: { color: 'bg-red-400', label: 'Backend Offline' },
  };
  const { color, label } = statusConfig[status];

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg)]">
            <TerminalSquare size={18} strokeWidth={2.5} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">
            DevAssist <span className="text-[var(--color-accent)]">AI</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[var(--color-text-dim)]">
            <span className="relative flex h-2 w-2">
              {status === 'online' && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`}></span>
            </span>
            {label}
          </div>

          {session && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-dim)] hover:text-[var(--color-accent)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}