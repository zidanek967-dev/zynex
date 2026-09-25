import { CaseStudiesPreview } from "@/components/sections/case-studies-preview";
import { Cta } from "@/components/sections/cta";
import { FaqPreview } from "@/components/sections/faq-preview";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Stats } from "@/components/sections/stats";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <div className="flex flex-col gap-24 py-24 sm:gap-32 sm:py-32">
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
