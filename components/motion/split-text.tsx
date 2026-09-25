"use client";

import { motion, useReducedMotion } from "motion/react";
import { createElement, type ElementType } from "react";

/**
 * Splits text into words and reveals them with a staggered rise+fade on
 * scroll-into-view. Falls back to plain static text under reduced motion.
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
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return createElement(Tag, { className }, text);
  }

  return createElement(
    Tag,
    { className },
    words.map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.05,
          }}
          className={`inline-block ${wordClassName ?? ""}`}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      </span>
    )),
  );
}
