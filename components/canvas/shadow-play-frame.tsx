"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

import { useInView } from "@/lib/hooks/use-in-view";
import { useShouldRender3D } from "@/lib/hooks/use-should-render-3d";

// Lazy-loaded and only mounted while on screen: the volumetric-light shader
// never ships to reduced-motion / low-power visitors, who get plain text.
const ShadowPlay = dynamic(() => import("@/components/canvas/shadow-play"), { ssr: false });

/** next/font hashes its family names, so read the real stack off the CSS variable. */
function displayFontStack() {
  if (typeof document === "undefined") return "system-ui, sans-serif";
  const stack = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim();
  return stack || "system-ui, sans-serif";
}

function StaticText({ text }: { text: string }) {
  return (
    <div
      aria-hidden="true"
      className="h-xl flex h-full flex-col items-center justify-center px-6 text-center text-balance whitespace-pre-line"
    >
      {text}
    </div>
  );
}

/**
 * Big display line whose letters throw a pointer-following volumetric shadow.
 * Use `\n` in `text` for hard line breaks. Rendered inside a fixed-height
 * frame, so size it with `className`.
 */
export function ShadowPlayFrame({ text, className }: { text: string; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const shouldRender3D = useShouldRender3D();
  const [fontFamily] = useState(displayFontStack);

  return (
    <div ref={ref} className={className}>
      <h2 className="sr-only">{text.replaceAll("\n", " ")}</h2>
      {inView && shouldRender3D ? (
        <Suspense fallback={<StaticText text={text} />}>
          <ShadowPlay
            text={text}
            font={{ fontFamily, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}
            textColor="#e8ecf5"
            backgroundColor="#05060a"
            shadowColor="#5ef2ff"
            fitPadding={10}
          />
        </Suspense>
      ) : (
        <StaticText text={text} />
      )}
    </div>
  );
}
