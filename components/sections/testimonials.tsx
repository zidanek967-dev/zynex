import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { OrbitCardStack } from "@/components/ui/orbit-card-stack";
import { Eyebrow } from "@/components/fx/eyebrow";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <Eyebrow>What clients say</Eyebrow>
        <SplitText
          as="h2"
          text="Trusted by teams who *ship fast*"
          className="h-lg"
        />
      </Reveal>

      <div className="mt-4">
        <OrbitCardStack />
      </div>
    </section>
  );
}
