"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Stat = { value: number; prefix?: string; suffix?: string; label: string };

const STATS: Stat[] = [
  { value: 5, prefix: "<", suffix: " days", label: "To a first working version" },
  { value: 100, suffix: "%", label: "AI-assisted, human-reviewed" },
  { value: 24, suffix: "/7", label: "AI agents that never sleep" },
  { value: 0, label: "Boilerplate written by hand" },
];

function Counter({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, prefersReducedMotion]);

  // Reduced motion skips the count-up animation entirely and just shows the
  // final value — no synchronous setState-in-effect needed for that path.
  const shown = prefersReducedMotion ? value : display;

  return (
    <span
      ref={ref}
      className="text-gradient font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-none font-bold tracking-tight whitespace-nowrap"
    >
      {prefix}
      {shown}
      {suffix ? (
        <span className={/^\s?[a-z]/i.test(suffix) ? "text-[0.45em]" : undefined}>{suffix}</span>
      ) : null}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="glass glow-border fx-card grid grid-cols-2 gap-10 rounded-3xl px-8 py-12 sm:grid-cols-4 sm:gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
