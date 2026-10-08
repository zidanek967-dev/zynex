"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** Cycles through phrases with a blur/fade swap. Static under reduced motion. */
export function SwapText({
  words,
  className,
  interval = 2600,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let swapTimer = 0;
    const timer = window.setInterval(() => {
      setLeaving(true);
      swapTimer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setLeaving(false);
      }, 350);
    }, interval);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swapTimer);
    };
  }, [words, interval]);

  return (
    <span
      className={cn(
        "inline-block border-b border-brand/50 font-semibold text-foreground transition-all duration-300",
        leaving && "-translate-y-2 opacity-0 blur-[6px]",
        className,
      )}
    >
      {words[index]}
    </span>
  );
}
