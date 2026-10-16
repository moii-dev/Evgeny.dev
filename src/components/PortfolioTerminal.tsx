import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { t } from '../i18n';
import { CONTACT_CONFIG } from '../config/contactConfig';
import { TECH_CATEGORIES, TECH_STACK } from '../data/techStack';
import { scrollToSection } from '../utils/scrollController';

const COMMANDS = ['help', 'skills', 'contact', 'cat about.txt', 'sudo hire-me', 'clear'] as const;
const DESCRIPTIONS = ['List commands', 'Explore my stack', 'Get in touch', 'Read my story', "Let's work together", 'Clear the terminal'];
type Entry = { id: number; input: string; command: string };

function CommandOutput({ command }: { command: string }) {
  switch (command) {
    case 'help':
      return <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">{COMMANDS.map((item, index) => <div key={item} className="contents"><dt className="text-emerald-300">{item}</dt><dd>{t(DESCRIPTIONS[index])}</dd></div>)}</dl>;
    case 'skills':
      return <div className="space-y-2">{TECH_CATEGORIES.filter(category => category.id !== 'all').map(category => <p key={category.id}><span className="text-neutral-100">{t(category.label)}: </span>{TECH_STACK.filter(item => item.category === category.id).map(item => item.name).join(' · ')}</p>)}</div>;
    case 'contact':
      return <div className="flex flex-col items-start gap-1">
        <a className="underline underline-offset-4 hover:text-white" href={`mailto:${CONTACT_CONFIG.socialLinks.email}`}>{CONTACT_CONFIG.socialLinks.email}</a>
        <a className="underline underline-offset-4 hover:text-white" href={CONTACT_CONFIG.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a className="underline underline-offset-4 hover:text-white" href={CONTACT_CONFIG.socialLinks.telegram} target="_blank" rel="noopener noreferrer">Telegram ↗</a>
      </div>;
    case 'cat about.txt':
      return <p>{t("I'm a developer passionate about building meaningful digital products. From Android applications to modern web experiences, I enjoy turning complex ideas into simple, intuitive solutions.")}</p>;
    case 'sudo hire-me':
      return <div className="space-y-2"><p>{t('Permission granted. Great things start with a conversation.')}</p><button type="button" onClick={() => {
        scrollToSection('contact');
        document.querySelector<HTMLInputElement>('#contact input')?.focus({ preventScroll: true });
      }} className="text-emerald-300 underline underline-offset-4 hover:text-emerald-200">{t("Let's talk")} ↗</button></div>;
    default:
      return <p className="text-amber-200">{t('Command not found. Type help to see available commands.')}</p>;
  }
}

export function PortfolioTerminal() {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const draft = useRef('');
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [entries]);

  function execute(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    const command = trimmed.toLowerCase().replace(/\s+/g, ' ');
    setHistory(previous => [...previous, trimmed].slice(-50));
    setHistoryIndex(null);
    draft.current = '';
    setInput('');
    if (command === 'clear') setEntries([]);
    else {
      const entry = { id: nextId.current++, input: trimmed, command };
      setEntries(previous => [...previous, entry].slice(-50));
    }
    inputRef.current?.focus({ preventScroll: true });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    execute(input);
  }

  function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    if (!history.length) return;
    if (historyIndex === null) draft.current = input;
    const index = event.key === 'ArrowUp'
      ? Math.max(0, (historyIndex ?? history.length) - 1)
      : Math.min(history.length, (historyIndex ?? history.length) + 1);
    setHistoryIndex(index === history.length ? null : index);
    setInput(index === history.length ? draft.current : history[index]);
  }

  return (
    <section aria-labelledby="terminal-title" className="grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-12 items-center py-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">{t('For the curious')}</p>
        <h2 id="terminal-title" className="font-serif text-3xl sm:text-4xl text-neutral-950 mb-3">{t('A little less GUI. A little more you.')}</h2>
        <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">{t('Explore my world from the command line. Try help to get started.')}</p>
      </div>
      <div className="min-w-0 overflow-hidden rounded-2xl border border-neutral-700 bg-[#131516] text-neutral-300 shadow-lg font-mono text-xs sm:text-sm">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 bg-white/[0.03]">
          <span aria-hidden="true" className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-[#ee6b60]" /><span className="h-2 w-2 rounded-full bg-[#f5bd4f]" /><span className="h-2 w-2 rounded-full bg-[#62c554]" /></span>
          <span className="text-neutral-400 text-[11px]">visitor@evgeny.dev: ~</span>
          <span className="ml-auto text-[10px] uppercase tracking-wider text-neutral-400">{t('Interactive shell')}</span>
        </div>
        <div ref={outputRef} role="log" aria-label={t('Terminal output')} aria-live="polite" tabIndex={0} data-lenis-prevent className="h-56 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 leading-relaxed break-words [overflow-wrap:anywhere]">
          <p className="text-neutral-400">{t('Welcome, visitor. Type help and make yourself at home.')}</p>
          {entries.map(entry => <div key={entry.id} className="space-y-2"><p className="text-neutral-100 whitespace-pre-wrap"><span aria-hidden="true" className="text-emerald-300">❯ </span>{entry.input}</p><CommandOutput command={entry.command} /></div>)}
        </div>
        <form onSubmit={submit} className="flex items-center gap-3 border-t border-white/10 px-4 sm:px-5 py-3 focus-within:bg-white/[0.03]">
          <label htmlFor="terminal-input" className="text-emerald-300"><span aria-hidden="true">❯</span><span className="sr-only">{t('Terminal command')}</span></label>
          <input id="terminal-input" ref={inputRef} value={input} onChange={event => { setInput(event.target.value); setHistoryIndex(null); }} onKeyDown={navigateHistory} autoComplete="off" autoCapitalize="off" spellCheck={false} maxLength={300} placeholder={t('Type a command…')} aria-describedby="terminal-hint" className="w-full min-w-0 bg-transparent text-base sm:text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus-visible:outline-none" />
          <button type="submit" aria-label={t('Run command')} className="shrink-0 rounded border border-white/15 px-2 py-1 text-neutral-400 hover:text-white hover:border-white/40">↵</button>
        </form>
        <div className="border-t border-white/10 px-4 sm:px-5 py-3">
          <p id="terminal-hint" className="sr-only">{t('Press Enter to run. Use Up and Down arrows for command history.')}</p>
          <div className="flex flex-wrap gap-1.5">{COMMANDS.map(command => <button key={command} type="button" onClick={() => execute(command)} className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-neutral-400 hover:text-emerald-300 hover:border-emerald-300/40 transition-colors">{command}</button>)}</div>
        </div>
      </div>
    </section>
  );
}
