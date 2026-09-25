import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { ServiceDetail } from "@/components/sections/service-detail";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { SERVICES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, web portals, web apps, mobile apps, dashboards, AI agents and automation — designed and built by ZYNEX, shipped in days.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zynex.ai";

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((service, index) => ({
    "@type": "Service",
    position: index + 1,
    name: service.label,
    description: service.summary,
    url: `${siteUrl}${service.href}`,
    provider: {
      "@type": "Organization",
      name: "ZYNEX",
    },
  })),
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-24 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">
          Services
        </span>
        <SplitText
          as="h1"
          text="Seven ways to ship faster with AI"
          className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        />
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          One AI-accelerated process, built around what you actually need — from a
          first landing page to a full AI agent.
        </p>
      </Reveal>

      <div className="mx-auto w-full max-w-6xl px-6">
        {SERVICES.map((service, index) => (
          <ServiceDetail key={service.id} service={service} index={index} />
        ))}
      </div>

      <Cta />
    </div>
  );
}
