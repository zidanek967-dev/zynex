"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { useShouldRender3D } from "@/lib/hooks/use-should-render-3d";

// Lazy-loaded, client-only: the shader never ships on the reduced-motion /
// low-power path, which gets a static nebula-ish gradient instead.
const CosmicBG = dynamic(() => import("@/components/canvas/cosmic-bg"), { ssr: false });

function StaticNebula() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(45% 40% at 50% 38%, rgba(104,35,195,0.35), transparent 70%), radial-gradient(40% 35% at 70% 60%, rgba(0,123,255,0.18), transparent 70%)",
      }}
    />
  );
}

export function CosmicBackground() {
  const shouldRender3D = useShouldRender3D();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-45" aria-hidden="true">
      {shouldRender3D ? (
        <Suspense fallback={<StaticNebula />}>
          <CosmicBG />
        </Suspense>
      ) : (
        <StaticNebula />
      )}
    </div>
  );
}
