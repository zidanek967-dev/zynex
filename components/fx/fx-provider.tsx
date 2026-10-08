"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer-driven polish for the marketing site: custom cursor, card spotlight,
 * 3D tilt, and a click ripple on buttons. Everything is delegated from document
 * so server-rendered sections opt in with a class (`fx-card`, `fx-tilt`) and no
 * per-component client code. Disabled entirely under prefers-reduced-motion;
 * cursor/spotlight/tilt additionally require a fine hover-capable pointer.
 */
export function FxProvider() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onPointerDown = (e: PointerEvent) => {
      const button = (e.target as Element | null)?.closest<HTMLElement>('[data-slot="button"]');
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.style.cssText = [
        "position:absolute",
        "border-radius:9999px",
        "pointer-events:none",
        "background:rgba(255,255,255,0.35)",
        "transform:scale(0)",
        "animation:ripple .65s ease-out forwards",
        `width:${size}px`,
        `height:${size}px`,
        `left:${e.clientX - rect.left - size / 2}px`,
        `top:${e.clientY - rect.top - size / 2}px`,
      ].join(";");
      button.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    };
    document.addEventListener("pointerdown", onPointerDown);

    if (!finePointer) {
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return () => document.removeEventListener("pointerdown", onPointerDown);

    document.body.classList.add("cursor-on");
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let tilted: HTMLElement | null = null;
    let raf = 0;

    const resetTilt = () => {
      if (tilted) tilted.style.transform = "";
      tilted = null;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      const target = e.target as Element | null;
      ring.dataset.hot = String(!!target?.closest("a, button, [role='button'], .fx-card"));

      const card = target?.closest<HTMLElement>(".fx-card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const tilt = target?.closest<HTMLElement>(".fx-tilt") ?? null;
      if (tilted && tilted !== tilt) resetTilt();
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
        tilted = tilt;
      }
    };

    const onDown = () => {
      ring.dataset.down = "true";
    };
    const onUp = () => {
      ring.dataset.down = "false";
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.body.classList.remove("cursor-on");
      resetTilt();
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] size-[34px] rounded-full border-[1.5px] border-brand-2/60 opacity-0 mix-blend-screen transition-[width,height,background-color,border-color] duration-200 data-[down=true]:size-6 data-[hot=true]:size-16 data-[hot=true]:border-brand data-[hot=true]:bg-brand/10"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] size-1.5 rounded-full bg-brand opacity-0 shadow-[0_0_10px_var(--brand)]"
      />
    </>
  );
}
