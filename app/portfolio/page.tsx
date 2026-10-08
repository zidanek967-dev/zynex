import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { getCaseStudies } from "@/lib/supabase/queries";
import { Eyebrow } from "@/components/fx/eyebrow";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Recent websites, apps, dashboards and AI agents built by ZYNEX.",
};

export default async function PortfolioPage() {
  const studies = await getCaseStudies();

  return (
    <div className="flex flex-col gap-20 py-24 sm:py-32">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <Eyebrow live>Portfolio</Eyebrow>
        <SplitText
          as="h1"
          text="Recent *builds*"
          className="max-w-3xl h-xl text-balance"
        />
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          A selection of what we&apos;ve shipped — the problem, the build, and the result.
        </p>
      </Reveal>

      <div className="mx-auto w-full max-w-6xl px-6">
        {studies.length === 0 ? (
          <p className="text-center text-muted-foreground">Case studies coming soon.</p>
        ) : (
          <PortfolioGrid studies={studies} />
        )}
      </div>

      <Cta />
    </div>
  );
}
