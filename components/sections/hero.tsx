import Link from "next/link";

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
