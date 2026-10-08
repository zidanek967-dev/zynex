"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { useInView } from "@/lib/hooks/use-in-view";
import { useShouldRender3D } from "@/lib/hooks/use-should-render-3d";

// Lazy-loaded: pulls in its own WebGL shader/particle-buffer setup, so it
// never ships to visitors who never scroll to the hero, and never mounts at
// all under the reduced-motion / low-power fallback path below.
const AccretionDisc = dynamic(() => import("@/components/canvas/accretion-disc"), {
  ssr: false,
});

function StaticFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(38% 55% at 50% 55%, color-mix(in oklab, var(--brand) 30%, transparent), transparent 70%), radial-gradient(60% 40% at 50% 55%, color-mix(in oklab, var(--brand-2) 14%, transparent), transparent 65%)",
      }}
      aria-hidden="true"
    />
  );
}

export function AccretionDiscBackground() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const shouldRender3D = useShouldRender3D();
  const canRender = inView && shouldRender3D;

  return (
    <div ref={ref} className="absolute inset-0">
      {canRender ? (
        <Suspense fallback={<StaticFallback />}>
          <AccretionDisc
            background="transparent"
            baseColor="#5EF2FF"
            accentColor="#A78BFA"
            density={55}
            disc={{ arms: 8, core: 6, tilt: 44 }}
            jets={{ amount: 23, length: 300, spread: 34 }}
          />
        </Suspense>
      ) : (
        <StaticFallback />
      )}
    </div>
  );
}
