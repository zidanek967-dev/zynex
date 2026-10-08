"use client";

import { useEffect, useState } from "react";

type Tone = "cmd" | "ok" | "plain" | "key";

const LINES: { tone: Tone; text: string }[] = [
  { tone: "cmd", text: "$ zynex plan your-project --stack next,supabase,ai" },
  { tone: "plain", text: "  reading brief ..." },
  { tone: "ok", text: "  ✓ scope: website · portal · agent" },
  { tone: "ok", text: "  ✓ design system generated, brand-matched" },
  { tone: "ok", text: "  ✓ database + auth provisioned (RLS on)" },
  { tone: "ok", text: "  ✓ AI agent wired to your data" },
  { tone: "plain", text: "  locking scope ..." },
  { tone: "key", text: "  scope        fixed · written down" },
  { tone: "key", text: "  delivery     days, not months" },
  { tone: "key", text: "  ownership    100% yours · code + accounts" },
  { tone: "cmd", text: "$ zynex review --human --security" },
  { tone: "ok", text: "  ✓ every change reviewed before ship" },
];

const TONE_CLASS: Record<Tone, string> = {
  cmd: "text-brand",
  ok: "text-success",
  plain: "text-muted-foreground",
  key: "text-foreground",
};

function useClock() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

/**
 * Illustrative build console — types out a sample ZYNEX project plan on a
 * loop. Static (fully rendered) under prefers-reduced-motion.
 */
export function BuildConsole({ className }: { className?: string }) {
  const [done, setDone] = useState(0);
  const [typed, setTyped] = useState(0);
  const [reduced, setReduced] = useState(false);
  const clock = useClock();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const id = window.setTimeout(() => setReduced(true), 0);
      return () => window.clearTimeout(id);
    }

    let line = 0;
    let chars = 0;
    let timer = 0;

    const step = () => {
      if (line >= LINES.length) {
        timer = window.setTimeout(() => {
          line = 0;
          chars = 0;
          setDone(0);
          setTyped(0);
          step();
        }, 6000);
        return;
      }
      const current = LINES[line];
      chars += current.tone === "cmd" ? 1 : 3;
      if (chars >= current.text.length) {
        line += 1;
        chars = 0;
        setDone(line);
        setTyped(0);
        timer = window.setTimeout(step, current.tone === "cmd" ? 420 : 160);
      } else {
        setTyped(chars);
        timer = window.setTimeout(step, current.tone === "cmd" ? 38 : 14);
      }
    };
    step();

    return () => window.clearTimeout(timer);
  }, []);

  const visibleDone = reduced ? LINES.length : done;
  const current = !reduced && done < LINES.length ? LINES[done] : null;

  return (
    <div className={`term-panel ${className ?? ""}`} aria-label="Illustrative build console">
      <div className="flex items-center gap-1.5 border-b border-border px-3.5 py-3">
        <span className="size-[9px] rounded-full bg-line-2" />
        <span className="size-[9px] rounded-full bg-line-2" />
        <span className="size-[9px] rounded-full bg-line-2" />
        <b className="ml-2.5 font-mono text-[0.72rem] font-normal text-muted-foreground">
          zynex://your-project
        </b>
      </div>
      <pre className="m-0 min-h-[300px] p-4 font-mono text-[0.8rem] leading-[1.75] whitespace-pre-wrap text-muted-foreground max-sm:min-h-[230px]">
        {LINES.slice(0, visibleDone).map((l, i) => (
          <span key={i} className={TONE_CLASS[l.tone]}>
            {l.text}
            {"\n"}
          </span>
        ))}
        {current ? (
          <span className={TONE_CLASS[current.tone]}>{current.text.slice(0, typed)}</span>
        ) : null}
        {!reduced ? (
          <span className="inline-block h-[1em] w-2 translate-y-0.5 animate-pulse bg-brand align-baseline" />
        ) : null}
      </pre>
      <div className="flex justify-between border-t border-border px-3.5 py-2.5 font-mono text-[0.66rem] tracking-[0.08em] text-dim uppercase">
        <span>Illustrative build plan</span>
        <span>{clock}</span>
      </div>
    </div>
  );
}
