"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { useInView } from "@/lib/hooks/use-in-view";
import { useShouldRender3D } from "@/lib/hooks/use-should-render-3d";

// Lazy-loaded: this pulls in its own WebGL shader/program setup, so it never
// ships to visitors who never scroll to the hero, and never mounts at all
// under the reduced-motion / low-power fallback path below.
const ParticleDrift = dynamic(() => import("@/components/canvas/particle-drift"), {
  ssr: false,
});

function StaticFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(60% 55% at 50% 40%, color-mix(in oklab, var(--brand) 20%, transparent), transparent 65%)",
      }}
      aria-hidden="true"
    />
  );
}

export function ParticleDriftBackground() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const shouldRender3D = useShouldRender3D();
  const canRender = inView && shouldRender3D;

  return (
    <div ref={ref} className="absolute inset-0">
      {canRender ? (
        <Suspense fallback={<StaticFallback />}>
          <ParticleDrift
            background="transparent"
            baseColor="#8B93A7"
            accentColor="#3D6BFF"
            density={220}
            dotSize={3.5}
            speed={35}
            direction={20}
            hover={200}
            linkDistance={150}
            linkThickness={1}
          />
        </Suspense>
      ) : (
        <StaticFallback />
      )}
    </div>
  );
}
