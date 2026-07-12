import { Brain, Bug, TestTube2 } from 'lucide-react';

const TOOLS = [
  { id: 'explain', Icon: Brain, label: 'Understand Code', desc: 'Analyze architecture, logic flow, key concepts, and complexity.' },
  { id: 'debug', Icon: Bug, label: 'Debug & Resolve', desc: 'Identify root causes, suggest fixes, and generate corrected code.' },
  { id: 'tests', Icon: TestTube2, label: 'Generate Tests', desc: 'Create production-ready Jest or PyTest test cases including edge cases.' },
];

export default function ToolSelectionCards({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {TOOLS.map(({ id, Icon, label, desc }) => {
        const isActive = selected === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`relative text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden h-full
              ${isActive
                ? 'border-[var(--color-accent)] bg-black/30 shadow-lg shadow-[var(--color-accent)]/10'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-dim)] hover:-translate-y-0.5'
              }`}
          >
            {isActive && (
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"></div>
            )}
            <Icon
              size={26}
              strokeWidth={1.75}
              className={isActive ? 'text-[var(--color-accent)] mb-3' : 'text-[var(--color-text-dim)] mb-3'}
            />
            <div className="font-medium text-sm mb-1.5">{label}</div>
            <div className="text-xs text-[var(--color-text-dim)] leading-relaxed">{desc}</div>
          </button>
        );
      })}
    </div>
  );
}