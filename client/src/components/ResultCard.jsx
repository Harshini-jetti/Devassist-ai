import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1 text-xs font-mono text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
    >
      {copied ? <><Check size={12} /> copied</> : <><Copy size={12} /> copy</>}
    </button>
  );
}

function Section({ label, children }) {
  return (
    <div className="border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0">
      <div className="text-xs uppercase tracking-wide text-[var(--color-accent)] font-mono mb-1.5">{label}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function CodeBlock({ code }) {
  return (
    <div className="relative bg-black/40 rounded-md p-3 mt-1">
      <div className="absolute top-2 right-2"><CopyButton text={code} /></div>
      <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap pr-12">{code}</pre>
    </div>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[var(--color-text-dim)]">{label}</span>
        <span className="font-mono">{value}/100</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
        <div className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function CodeQualityScore({ score }) {
  if (!score) return null;
  return (
    <Section label="Code Quality Score">
      <div className="text-2xl font-bold font-mono mb-3">{score.overall}<span className="text-sm text-[var(--color-text-dim)]">/100</span></div>
      <ScoreBar label="Readability" value={score.readability} />
      <ScoreBar label="Maintainability" value={score.maintainability} />
      <ScoreBar label="Performance" value={score.performance} />
      <ScoreBar label="Best Practices" value={score.bestPractices} />
    </Section>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-[var(--color-border)] rounded-lg p-10 text-center">
      <div className="text-sm font-medium mb-1.5 tracking-tight">Ready for Analysis</div>
      <p className="text-xs text-[var(--color-text-dim)] leading-relaxed max-w-sm mx-auto">
        Choose a tool, paste or write your code, then click "Analyze Code."
        AI-generated insights will appear here.
      </p>
    </div>
  );
}

const LOADING_MESSAGES = [
  'Analyzing code...',
  'Understanding logic...',
  'Estimating complexity...',
  'Generating AI insights...',
];

function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[var(--color-border)] rounded-lg p-10 flex flex-col items-center gap-3">
      <div className="w-5 h-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs text-[var(--color-text-dim)] font-mono transition-opacity duration-300">
        {LOADING_MESSAGES[msgIndex]}
      </p>
    </div>
  );
}

export default function ResultCard({ mode, data, loading }) {
  if (loading) return <LoadingState />;
  if (!data) return <EmptyState />;

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 space-y-5 animate-[fadeIn_0.4s_ease-out]">
      {mode === 'explain' && (
        <>
          <Section label="Summary">{data.summary}</Section>
          <Section label="Logic Breakdown">{data.logic}</Section>
          <Section label="Key Concepts">
            <div className="flex flex-wrap gap-2">
              {data.keyConcepts?.map((c, i) => (
                <span key={i} className="text-xs bg-[var(--color-surface-hover)] px-2 py-1 rounded font-mono">{c}</span>
              ))}
            </div>
          </Section>
          <Section label="Time Complexity"><span className="font-mono">{data.timeComplexity}</span></Section>
          {data.spaceComplexity && <Section label="Space Complexity"><span className="font-mono">{data.spaceComplexity}</span></Section>}
          <CodeQualityScore score={data.codeQualityScore} />
          <Section label="Suggested Improvements">
            <ul className="list-disc list-inside space-y-1">
              {data.improvements?.map((imp, i) => <li key={i}>{imp}</li>)}
            </ul>
          </Section>
        </>
      )}

      {mode === 'debug' && (
        <>
          <Section label="Root Cause">{data.rootCause}</Section>
          {data.errorExplanation && <Section label="Error Explanation">{data.errorExplanation}</Section>}
          <Section label="Suggested Fix">{data.fix}</Section>
          <Section label="Corrected Code"><CodeBlock code={data.correctedCode} /></Section>
          <Section label="Why This Works">{data.explanation}</Section>
          {data.bestPractices && (
            <Section label="Best Practices">
              <ul className="list-disc list-inside space-y-1">
                {data.bestPractices.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </Section>
          )}
        </>
      )}

      {mode === 'tests' && (
        <>
          <Section label="Framework Used"><span className="font-mono">{data.framework}</span></Section>
          <Section label="Generated Test Cases"><CodeBlock code={data.testCode} /></Section>
          <Section label="Edge Cases Covered">
            <ul className="list-disc list-inside space-y-1">
              {data.edgeCasesCovered?.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </Section>
          {data.coverageNotes && <Section label="Coverage Notes">{data.coverageNotes}</Section>}
        </>
      )}
    </div>
  );
}