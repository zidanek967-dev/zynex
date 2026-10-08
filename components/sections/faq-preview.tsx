import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQS } from "@/lib/data/faqs";
import { Eyebrow } from "@/components/fx/eyebrow";

export function FaqPreview() {
  const preview = FAQS.slice(0, 4);

  return (
    <section className="mx-auto max-w-3xl px-6">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <Eyebrow>FAQ</Eyebrow>
        <SplitText
          as="h2"
          text="Questions, *answered*"
          className="h-lg"
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Accordion>
          {preview.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="font-display text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 flex justify-center">
        <Button variant="outline" render={<Link href="/faq" />}>
          View all FAQs
        </Button>
      </Reveal>
    </section>
  );
}
