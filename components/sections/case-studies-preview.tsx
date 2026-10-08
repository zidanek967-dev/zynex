import Link from "next/link";

import { CaseStudyCard } from "@/components/sections/case-study-card";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { getCaseStudies } from "@/lib/supabase/queries";
import { Eyebrow } from "@/components/fx/eyebrow";

export async function CaseStudiesPreview() {
  const caseStudies = (await getCaseStudies()).slice(0, 3);

  if (caseStudies.length === 0) return null;

  return (
    <section id="work" className="mx-auto max-w-6xl px-6">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <Eyebrow>Featured work</Eyebrow>
        <SplitText
          as="h2"
          text="Recent *builds*"
          className="h-lg"
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug} delay={i * 0.1}>
            <CaseStudyCard study={study} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex justify-center">
        <Button variant="outline" render={<Link href="/portfolio" />}>
          View all work
        </Button>
      </Reveal>
    </section>
  );
}
