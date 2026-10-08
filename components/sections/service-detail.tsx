import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SERVICE_ICONS } from "@/lib/data/service-icons";
import type { Service } from "@/lib/data/services";

export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const Icon = SERVICE_ICONS[service.id];

  return (
    <section
      id={service.id}
      className="scroll-mt-28 border-t border-border py-16 first:border-t-0 first:pt-0"
    >
      <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-brand">
              {Icon ? <Icon className="size-5" /> : null}
            </span>
            <span className="font-display text-sm font-semibold text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {service.label}
          </h2>
          <p className="mt-4 text-muted-foreground">{service.summary}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Good fit if: </span>
            {service.idealFor}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-foreground"
          >
            Get a quote for this
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="glass glow-border fx-card rounded-3xl border border-border p-6 sm:p-8">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            What&apos;s included
          </span>
          <ul className="mt-4 flex flex-col gap-3">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
