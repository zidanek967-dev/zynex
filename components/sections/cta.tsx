import Link from "next/link";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <Reveal>
        <div className="glow-border glass relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--brand) 22%, transparent), transparent)",
            }}
            aria-hidden="true"
          />
          <SplitText
            as="h2"
            text="Ready to build something fast?"
            className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Tell us what you need — get a scoped quote in minutes and a working
            plan for shipping in days.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Button size="lg" render={<Link href="/contact" />} className="px-6">
                Get a Quote
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="lg" variant="outline" render={<Link href="/contact" />} className="px-6">
                Book a Call
              </Button>
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
