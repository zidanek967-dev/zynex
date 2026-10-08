import type { Metadata } from "next";
import { Bot, Gauge, ShieldCheck } from "lucide-react";

import { Cta } from "@/components/sections/cta";
import { Team } from "@/components/sections/team";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow } from "@/components/fx/eyebrow";

export const metadata: Metadata = {
  title: "About",
  description:
    "ZYNEX is an AI-powered product studio based in the UAE, building software for clients worldwide.",
};

const WHY_AI = [
  {
    icon: Gauge,
    title: "Speed without the shortcuts",
    body: "AI removes the slow, repetitive parts of a build — boilerplate, first-draft UI, wiring up data — so timelines shrink without cutting scope.",
  },
  {
    icon: ShieldCheck,
    title: "Every line reviewed",
    body: "Nothing ships untouched. Our team reviews, hardens, and tests every AI-generated build before it reaches you.",
  },
  {
    icon: Bot,
    title: "AI runs our own studio, too",
    body: "The same agents and automation we build for clients run parts of how we work — we use what we sell.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 py-24 sm:py-32">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <Eyebrow live>About</Eyebrow>
        <SplitText
          as="h1"
          text="Software, built at the *speed of AI*"
          className="max-w-3xl h-xl text-balance"
        />
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          ZYNEX is an AI-powered product studio based in the UAE, building websites,
          apps, dashboards and AI agents for clients worldwide.
        </p>
      </Reveal>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Built because good software took too long
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-muted-foreground">
            <p>
              Most software still ships the way it did a decade ago — months of
              back-and-forth for a website, quarters for a real product. ZYNEX
              exists because that timeline no longer makes sense.
            </p>
            <p>
              We use AI throughout the build — architecture, interface generation,
              and implementation — while our team stays in the loop for every
              decision that actually matters: your brand, your edge cases, your
              users. The result is software that ships in days, reviewed and
              finished by people, not just generated and handed over.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass glow-border fx-card h-full rounded-3xl border border-border p-8">
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-4 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Make world-class software achievable on a startup timeline —
              without a startup&apos;s headcount.
            </p>
            <p className="mt-5 text-muted-foreground">
              Small businesses and startups shouldn&apos;t have to choose between
              quality and speed. We build so they don&apos;t have to.
            </p>
          </div>
        </Reveal>
      </div>

      <section className="mx-auto w-full max-w-6xl px-6">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>Why AI-built</Eyebrow>
          <h2 className="h-lg">
            Faster doesn&apos;t mean cut corners
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {WHY_AI.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="flex flex-col gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-brand">
                <item.icon className="size-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Team />

      <Cta />
    </div>
  );
}
