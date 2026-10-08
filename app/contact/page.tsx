import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";

import { Booking } from "@/components/sections/booking";
import { QuoteBuilder } from "@/components/sections/quote-builder";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow } from "@/components/fx/eyebrow";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building and get a project scope back fast, or book a call directly with ZYNEX.",
};

const EMAIL = "hello@zynex.ai"; // TODO(placeholder): real contact email
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER ?? "971589342572";
const CAL_LINK = process.env.CAL_LINK ?? "https://cal.com/your-team/intro-call";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-20 py-24 sm:py-32">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <Eyebrow live>Get in touch</Eyebrow>
        <SplitText
          as="h1"
          text="Tell us what you're *building*"
          className="max-w-3xl h-xl text-balance"
        />
        <p className="max-w-xl text-muted-foreground">
          Answer a few quick questions and we&apos;ll come back with a scope and timeline —
          usually within one business day.
        </p>
      </Reveal>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <QuoteBuilder />

        <div className="flex flex-col gap-4">
          <Reveal delay={0.1} className="glass glow-border fx-card rounded-3xl border border-border p-6">
            <h2 className="font-display text-sm font-semibold text-foreground">
              Prefer to talk directly?
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4 shrink-0" />
                {EMAIL}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi ZYNEX, I'd like to talk about a project.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <MessageCircle className="size-4 shrink-0" />
                WhatsApp us
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="glass glow-border fx-card rounded-3xl border border-border p-6">
            <h2 className="font-display text-sm font-semibold text-foreground">
              What happens next
            </h2>
            <ol className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li>1. We review your answers and, if needed, ask a follow-up question.</li>
              <li>2. You get a scope, timeline, and fixed quote back.</li>
              <li>3. We kick off — most builds ship in days, not months.</li>
            </ol>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Or book a call
          </h2>
          <p className="text-sm text-muted-foreground">
            Grab 20 minutes with us directly — no form required.
          </p>
        </Reveal>
        <Booking calLink={CAL_LINK} />
      </div>
    </div>
  );
}
