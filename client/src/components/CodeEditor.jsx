import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, language = 'javascript' }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[var(--color-border)] w-full shadow-xl shadow-black/30">
      <div className="bg-[var(--color-surface)] px-4 py-3 flex items-center gap-2 border-b border-[var(--color-border)]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
        <span className="ml-2 text-xs text-[var(--color-text-dim)] font-mono">
          {language === 'python' ? 'snippet.py' : 'snippet.js'}
        </span>
      </div>
      <Editor
        height="280px"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: 'JetBrains Mono, monospace',
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}