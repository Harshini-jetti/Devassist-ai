export default function Footer() {
  const stack = ['React', 'Vite', 'Tailwind CSS', 'Express', 'Node.js', 'Gemini API'];
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {stack.map((tech) => (
            <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-dim)]">
              {tech}
            </span>
          ))}
        </div>
        <a href="https://github.com/YOUR_USERNAME/devassist-ai" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors">
          View source on GitHub
        </a>
      </div>
    </footer>
  );
}