import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { OrbitCardStack } from "@/components/ui/orbit-card-stack";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">
          What clients say
        </span>
        <SplitText
          as="h2"
          text="Trusted by teams who ship fast"
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        />
      </Reveal>

      <div className="mt-4">
        <OrbitCardStack />
      </div>
    </section>
  );
}
