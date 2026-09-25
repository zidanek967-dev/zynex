"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { useShouldRender3D } from "@/lib/hooks/use-should-render-3d";

// Lazy-loaded: pulls in the `ogl` WebGL runtime and its own shader/texture
// setup, so it never ships to visitors on the reduced-motion / low-power
// fallback path below (this is a persistent page-level background, not a
// scrolled-to section, so unlike the hero canvases there's no in-view gate —
// it's rendered whenever the page it's on is rendered).
const DottedBackground = dynamic(() => import("@/components/canvas/dot-matrix"), {
  ssr: false,
});

export function DotMatrixBackground() {
  const shouldRender3D = useShouldRender3D();

  if (!shouldRender3D) {
    // No canvas at all under reduced-motion/low-power — the page's own
    // background color already reads fine on its own; this is pure ambient
    // texture, not content.
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.12]" aria-hidden="true">
      <Suspense fallback={null}>
        <DottedBackground
          bgColor="transparent"
          colors={["#0E1016", "#1B2033", "#3D6BFF"]}
          cellSize={26}
          gamma={9}
          paletteBias={3}
        />
      </Suspense>
    </div>
  );
}
