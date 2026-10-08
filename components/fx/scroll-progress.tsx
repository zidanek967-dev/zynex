"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gradient-brand fixed inset-x-0 top-0 z-[60] h-[3px] origin-left shadow-[0_0_12px_rgba(94,242,255,0.6)]"
    />
  );
}
