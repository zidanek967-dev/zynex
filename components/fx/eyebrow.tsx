"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/";

/**
 * Mono uppercase section label with an optional live-status dot. Text decodes
 * from random glyphs the first time it scrolls into view (skipped under
 * prefers-reduced-motion).
 */
export function Eyebrow({
  children,
  live = false,
  className,
}: {
  children: string;
  live?: boolean;
  className?: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    const node = el?.firstChild;
    if (!el || !node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const original = children;
    let raf = 0;

    const run = () => {
      let frame = 0;
      const total = 22;
      const tick = () => {
        frame += 1;
        let out = "";
        for (let i = 0; i < original.length; i++) {
          const ch = original[i];
          out += ch === " " || i < (original.length * frame) / total
            ? ch
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        node.textContent = out;
        if (frame < total) raf = window.requestAnimationFrame(tick);
        else node.textContent = original;
      };
      raf = window.requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.cancelAnimationFrame(raf);
      node.textContent = original;
    };
  }, [children]);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-brand uppercase",
        className,
      )}
    >
      {live ? <span className="live-dot" aria-hidden="true" /> : null}
      <span ref={textRef}>{children}</span>
    </span>
  );
}
