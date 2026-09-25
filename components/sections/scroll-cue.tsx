"use client";

import { motion, useReducedMotion } from "motion/react";

export function ScrollCue() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
      <div className="flex h-9 w-6 items-start justify-center rounded-full border border-border p-1.5">
        <motion.span
          className="h-1.5 w-1 rounded-full bg-brand"
          animate={prefersReducedMotion ? undefined : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
