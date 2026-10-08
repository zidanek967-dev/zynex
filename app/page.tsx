import { CaseStudiesPreview } from "@/components/sections/case-studies-preview";
import { Cta } from "@/components/sections/cta";
import { FaqPreview } from "@/components/sections/faq-preview";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Stats } from "@/components/sections/stats";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { WhyZynex } from "@/components/sections/why-zynex";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      {/* space-y, not flex-col — flex items default to min-width:auto, which let
          non-wrapping content (the services dock) force this wider than the
          viewport on mobile. Block layout with margin-based spacing doesn't
          have that failure mode. */}
      <div className="space-y-24 py-24 sm:space-y-32 sm:py-32">
        <WhyZynex />
        <ServicesOverview />
        <Process />
        <CaseStudiesPreview />
        <Stats />
        <Testimonials />
        <FaqPreview />
        <Cta />
      </div>
    </>
  );
}
