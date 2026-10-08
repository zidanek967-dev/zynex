import { Activity, Cpu, ShieldCheck } from "lucide-react";

import { BuildConsole } from "@/components/fx/build-console";
import { Eyebrow } from "@/components/fx/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

const POINTS = [
  {
    icon: Cpu,
    title: "AI-accelerated build",
    body: "AI agents draft features, tests and documentation in parallel, so more of the budget goes into your product.",
  },
  {
    icon: ShieldCheck,
    title: "Human-reviewed",
    body: "Every change is reviewed before it ships, with an independent security review of logins and data access before launch.",
  },
  {
    icon: Activity,
    title: "Fixed and transparent",
    body: "A fixed price, a working demo at every milestone, and your code in your own repository from the first commit.",
  },
] as const;

export function WhyZynex() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal className="flex flex-col items-start gap-4">
            <Eyebrow live>Why ZYNEX</Eyebrow>
            <SplitText as="h2" text="AI speed. *Engineering discipline.*" className="h-lg text-balance" />
            <p className="max-w-xl text-muted-foreground">
              We use AI agents to design, write and test software faster, and keep a human
              engineer accountable for every decision. You get a production platform in weeks,
              not quarters, without cutting corners on security.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-4">
            {POINTS.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <div className="glass glow-border fx-card fx-card fx-tilt flex gap-4 rounded-2xl p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-brand/15 to-brand-2/15 text-brand">
                    <point.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{point.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <BuildConsole />
        </Reveal>
      </div>
    </section>
  );
}
