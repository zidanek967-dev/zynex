"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { useInView } from "@/lib/hooks/use-in-view";
import { useShouldRender3D } from "@/lib/hooks/use-should-render-3d";

// Lazy-loaded so the R3F/three.js bundle never ships to visitors who never
// scroll to / trigger the hero (and never ships at all under the fallback path).
const ParticleCore = dynamic(
  () => import("@/components/three/particle-core").then((mod) => mod.ParticleCore),
  { ssr: false },
);

function StaticFallback() {
  return (
    <div
      className="h-full w-full rounded-full"
      style={{
        background:
          "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--brand) 35%, transparent), transparent 60%), radial-gradient(circle at 60% 60%, color-mix(in oklab, var(--brand-2) 22%, transparent), transparent 55%)",
      }}
      aria-hidden="true"
    />
  );
}

export function HeroScene() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const shouldRender3D = useShouldRender3D();
  const canRender = inView && shouldRender3D;

  return (
    <div ref={ref} className="relative h-full w-full">
      {canRender ? (
        <Suspense fallback={<StaticFallback />}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ParticleCore />
          </Canvas>
        </Suspense>
      ) : (
        <StaticFallback />
      )}
    </div>
  );
}
