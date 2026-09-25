"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is on-screen via IntersectionObserver. Used to
 * pause expensive work (3D render loops, heavy animation) when scrolled away.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(!!entry?.isIntersecting);
    }, options ?? { threshold: 0.15 });

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
