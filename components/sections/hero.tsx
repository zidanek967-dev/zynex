import Image from "next/image";
import Link from "next/link";

import { ParticleDriftBackground } from "@/components/canvas/particle-drift-background";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { ScrollCue } from "@/components/sections/scroll-cue";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background image — cropped to fill the hero at any viewport ratio.
          Scoped to this section only (overflow-hidden + absolute inset-0). */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <Image
          src="/images/hero-galaxy.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-background/55" />
      </div>

      <ParticleDriftBackground />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-1/2 bg-gradient-to-b from-background to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-1/3 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs tracking-widest text-muted-foreground uppercase backdrop-blur-sm">
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
