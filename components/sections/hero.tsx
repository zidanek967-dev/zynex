import Link from "next/link";

import { AccretionDiscBackground } from "@/components/canvas/accretion-disc-background";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { ScrollCue } from "@/components/sections/scroll-cue";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      <AccretionDiscBackground />

      {/* Radial scrim behind the text column — the disc is brightest exactly
          where the headline/copy sit, so a flat top/bottom fade alone left
          the paragraph unreadable against the lime arm band. */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          // Viewport-unit sizing (not %, which is relative to this section's
          // own box) so the mask covers the text column consistently on both
          // mobile's narrow/tall box and desktop's wide one.
          background:
            "radial-gradient(ellipse min(78vw, 480px) min(38vh, 320px) at 50% 50%, color-mix(in oklab, var(--background) 82%, transparent), transparent 78%)",
        }}
        aria-hidden="true"
      />
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

        <p
          className="max-w-xl text-base text-foreground/85 sm:text-lg"
          style={{ textShadow: "0 2px 18px rgba(0,0,0,0.85)" }}
        >
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
            {/* Outline variant's default dark-mode fill (bg-input/30, ~4%
                opaque) disappears against this busy background — give this
                instance an actual backdrop. */}
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/portfolio" />}
              className="border-white/20 bg-background/60 px-6 backdrop-blur-sm hover:bg-background/80 dark:bg-background/60 dark:hover:bg-background/80"
            >
              See our work
            </Button>
          </MagneticButton>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
