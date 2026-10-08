import Link from "next/link";

import { AccretionDiscBackground } from "@/components/canvas/accretion-disc-background";
import { Eyebrow } from "@/components/fx/eyebrow";
import { SwapText } from "@/components/fx/swap-text";
import { CascadeText } from "@/components/motion/cascade-text";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ScrollCue } from "@/components/sections/scroll-cue";
import { Button } from "@/components/ui/button";

const META = [
  { label: "Delivery", value: "Days, not months" },
  { label: "Review", value: "Human, every change" },
  { label: "Ownership", value: "100% yours" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      <AccretionDiscBackground />

      {/* Radial scrim behind the text column — the disc is brightest exactly
          where the headline/copy sit, so a flat top/bottom fade alone left
          the paragraph unreadable against the bright arm band. */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          // Viewport-unit sizing (not %, which is relative to this section's
          // own box) so the mask covers the text column consistently on both
          // mobile's narrow/tall box and desktop's wide one.
          background:
            "radial-gradient(ellipse min(82vw, 560px) min(40vh, 340px) at 50% 50%, color-mix(in oklab, var(--background) 82%, transparent), transparent 78%)",
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
        <Eyebrow live className="rounded-full border border-border bg-background/50 px-3.5 py-1.5 backdrop-blur-sm">
          AI-Powered Product Studio
        </Eyebrow>

        <CascadeText
          text="AI-built software. *Shipped in days.*"
          className="h-xl max-w-4xl text-balance"
        />

        <p
          className="max-w-xl text-base text-foreground/85 sm:text-lg"
          style={{ textShadow: "0 2px 18px rgba(0,0,0,0.85)" }}
        >
          We design and build{" "}
          <SwapText words={["websites", "web apps", "dashboards", "mobile apps", "AI agents"]} />{" "}
          for ambitious teams — using AI to compress months of work into days, without cutting
          quality.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <Button size="lg" render={<Link href="/contact" />}>
              Get a Quote
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/portfolio" />}
              className="bg-background/60 backdrop-blur-sm"
            >
              See our work
            </Button>
          </MagneticButton>
        </div>

        <dl className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-3 rounded-2xl border border-border bg-background/60 px-6 py-3.5 font-mono text-[0.78rem] text-muted-foreground backdrop-blur-sm">
          {META.map((item) => (
            <div key={item.label} className="text-left">
              <dt>{item.label}</dt>
              <dd className="m-0 text-[0.95rem] font-medium text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ScrollCue />
    </section>
  );
}
