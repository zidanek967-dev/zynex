import Link from "next/link";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { SplitText } from "@/components/motion/split-text";
import { HeroScene } from "@/components/three/hero-scene";
import { Button } from "@/components/ui/button";
import { ScrollCue } from "@/components/sections/scroll-cue";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[600px] -translate-x-1/2 -translate-y-1/2 opacity-90 sm:size-[820px]"
        aria-hidden="true"
      >
        <HeroScene />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-border px-3 py-1 text-xs tracking-widest text-muted-foreground uppercase">
          AI-Powered Product Studio
        </span>

        <SplitText
          as="h1"
          text="AI-built software. Shipped in days."
          className="max-w-3xl text-glow font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-7xl"
        />

        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          ZYNEX designs and builds websites, apps, dashboards and AI agents for
          ambitious teams — using AI to compress months of work into days,
          without cutting quality.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <Button size="lg" render={<Link href="/contact" />} className="px-6">
              Get a Quote
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button size="lg" variant="outline" render={<Link href="/portfolio" />} className="px-6">
              See our work
            </Button>
          </MagneticButton>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
