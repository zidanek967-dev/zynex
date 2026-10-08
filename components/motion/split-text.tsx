"use client";

import { motion, useReducedMotion } from "motion/react";
import { createElement, type ElementType } from "react";

/**
 * Splits text into words and reveals them with a staggered rise+fade on
 * mount. Wrap words in `*asterisks*` to render them as gradient accent text.
 * Falls back to plain static text under reduced motion.
 *
 * Deliberately animates on mount rather than `whileInView`: nested inside
 * client-side page navigation (AnimatePresence + Next's router), whileInView
 * could get stuck permanently at its `initial` state — a heading rendering
 * invisible is a much worse failure than losing the scroll-triggered variant
 * of this effect, and the various <Reveal> wrappers already provide a
 * scroll-into-view entrance at the section level for content further down a
 * page.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  wordClassName,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  wordClassName?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const plain = text.replaceAll("*", "");
  const words = text
    .split("*")
    .flatMap((segment, i) =>
      segment
        .split(" ")
        .filter(Boolean)
        .map((word) => ({ word, accent: i % 2 === 1 })),
    );

  if (prefersReducedMotion) {
    return createElement(
      Tag,
      { className, "aria-label": plain },
      words.map(({ word, accent }, i) => (
        <span key={`${word}-${i}`}>
          {i > 0 ? " " : ""}
          <span className={accent ? "text-gradient" : undefined}>{word}</span>
        </span>
      )),
    );
  }

  return createElement(
    Tag,
    { className, "aria-label": plain },
    words.map(({ word, accent }, i) => (
      <span key={`${word}-${i}`} aria-hidden="true">
        {i > 0 ? " " : ""}
        <span className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.05,
            }}
            className={`inline-block ${accent ? "text-gradient" : ""} ${wordClassName ?? ""}`}
          >
            {word}
          </motion.span>
        </span>
      </span>
    )),
  );
}
