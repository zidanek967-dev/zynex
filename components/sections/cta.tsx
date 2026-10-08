import Link from "next/link";

import { ShadowPlayFrame } from "@/components/canvas/shadow-play-frame";
import { Eyebrow } from "@/components/fx/eyebrow";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <Reveal>
        <div className="glow-border glass fx-card relative overflow-hidden rounded-3xl p-3 sm:p-4">
          <ShadowPlayFrame
            text={"Ready to build\nsomething fast?"}
            className="h-[clamp(240px,38vw,420px)] overflow-hidden rounded-2xl border border-line-2 bg-background"
          />
          <div className="flex flex-col items-center gap-6 px-4 pt-8 pb-8 text-center sm:px-8">
            <Eyebrow>Move your cursor across the words</Eyebrow>
            <p className="max-w-xl text-muted-foreground">
              Tell us what you need — get a scoped quote in minutes and a working plan for
              shipping in days.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button size="lg" render={<Link href="/contact" />}>
                  Get a Quote
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button size="lg" variant="outline" render={<Link href="/contact" />}>
                  Book a Call
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
