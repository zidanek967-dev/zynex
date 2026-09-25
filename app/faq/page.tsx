import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about working with ZYNEX.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col gap-20 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">FAQ</span>
        <SplitText
          as="h1"
          text="Questions, answered"
          className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        />
      </Reveal>

      <Reveal delay={0.1} className="mx-auto w-full max-w-3xl px-6">
        <Accordion>
          {FAQS.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="font-display text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>

      <Cta />
    </div>
  );
}
