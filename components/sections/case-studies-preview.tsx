import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

const COVER_GRADIENTS = [
  "linear-gradient(135deg, color-mix(in oklab, var(--brand) 35%, var(--surface)), var(--surface))",
  "linear-gradient(135deg, color-mix(in oklab, var(--brand-2) 30%, var(--surface)), var(--surface))",
  "linear-gradient(135deg, color-mix(in oklab, var(--success) 28%, var(--surface)), var(--surface))",
];

export async function CaseStudiesPreview() {
  const supabase = await createClient();
  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select("slug, title, summary, industry, stack, cover_image_url")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .limit(3);

  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section id="work" className="mx-auto max-w-6xl px-6">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">
          Featured work
        </span>
        <SplitText
          as="h2"
          text="Recent builds"
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug} delay={i * 0.1}>
            <Link
              href={`/portfolio/${study.slug}`}
              className="glow-border group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="relative h-40 w-full"
                style={{
                  backgroundImage: study.cover_image_url
                    ? `url(${study.cover_image_url})`
                    : COVER_GRADIENTS[i % COVER_GRADIENTS.length],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {study.industry && (
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[0.65rem] font-semibold tracking-widest text-foreground uppercase backdrop-blur">
                    {study.industry}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {study.title}
                </h3>
                <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {study.summary}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Read case study
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
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
