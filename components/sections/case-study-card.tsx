import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { CaseStudy } from "@/lib/supabase/queries";

const COVER_GRADIENTS = [
  "linear-gradient(135deg, color-mix(in oklab, var(--brand) 35%, var(--surface)), var(--surface))",
  "linear-gradient(135deg, color-mix(in oklab, var(--brand-2) 30%, var(--surface)), var(--surface))",
  "linear-gradient(135deg, color-mix(in oklab, var(--success) 28%, var(--surface)), var(--surface))",
];

export function CaseStudyCard({ study, index = 0 }: { study: CaseStudy; index?: number }) {
  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className="glow-border group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="relative h-40 w-full"
        style={{
          backgroundImage: study.cover_image_url
            ? `url(${study.cover_image_url})`
            : COVER_GRADIENTS[index % COVER_GRADIENTS.length],
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
        <h3 className="font-display text-lg font-semibold text-foreground">{study.title}</h3>
        <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">{study.summary}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
          Read case study
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
