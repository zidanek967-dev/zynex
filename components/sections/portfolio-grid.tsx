"use client";

import { useMemo, useState } from "react";

import { CaseStudyCard } from "@/components/sections/case-study-card";
import { Reveal } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";

export function PortfolioGrid({ studies }: { studies: CaseStudy[] }) {
  const industries = useMemo(() => {
    const set = new Set(studies.map((s) => s.industry).filter((v): v is string => !!v));
    return ["All", ...Array.from(set)];
  }, [studies]);

  const [active, setActive] = useState("All");

  const filtered = active === "All" ? studies : studies.filter((s) => s.industry === active);

  return (
    <div>
      {industries.length > 2 && (
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => setActive(industry)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === industry
                  ? "border-brand bg-brand/15 text-foreground"
                  : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
              )}
            >
              {industry}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No case studies in this category yet.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study, i) => (
            <Reveal key={study.slug} delay={(i % 3) * 0.1}>
              <CaseStudyCard study={study} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
