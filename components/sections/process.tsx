import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    description: "We scope goals, constraints and success criteria — via the quote builder or a call.",
  },
  {
    n: "02",
    title: "Design",
    description: "AI generates first-pass UI across real content; our team shapes it to your brand.",
  },
  {
    n: "03",
    title: "Build",
    description: "AI writes the first implementation; engineers review, harden, and wire up real data.",
  },
  {
    n: "04",
    title: "Ship",
    description: "Tested, deployed, and handed over — most projects launch in days, not months.",
  },
  {
    n: "05",
    title: "Support",
    description: "We stay on to iterate, fix, extend, or scale as your product grows.",
  },
] as const;

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-6">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">
          How we build with AI
        </span>
        <SplitText
          as="h2"
          text="Five steps from idea to launch"
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        />
      </Reveal>

      <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        <div
          className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          aria-hidden="true"
        />
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.08} className="relative flex flex-col gap-3">
            <span className="font-display text-sm font-semibold text-brand">{step.n}</span>
            <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
