"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { MagneticDock } from "@/components/ui/magnetic-dock";
import { SERVICE_ICONS } from "@/lib/data/service-icons";
import { SERVICES } from "@/lib/data/services";

export function ServicesOverview() {
  const router = useRouter();

  const dockItems = SERVICES.map((service) => {
    const Icon = SERVICE_ICONS[service.id];
    return {
      id: service.id,
      label: service.label,
      icon: Icon ? <Icon className="size-6" /> : null,
      onClick: () => router.push(service.href),
    };
  });

  return (
    <section id="services" className="mx-auto max-w-6xl px-6">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">
          What we build
        </span>
        <SplitText
          as="h2"
          text="Seven ways to ship faster with AI"
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        />
        <p className="max-w-xl text-muted-foreground">
          From a first landing page to a full AI agent — one team, one AI-accelerated
          process, built around what you actually need.
        </p>
      </Reveal>

      {/* 7 icons at a usable (44px+) touch size don't fit a narrow viewport —
          scrolls horizontally there instead of forcing the row (and the whole
          section) wider than the screen; centers normally once there's room. */}
      <Reveal
        delay={0.1}
        className="-mx-6 mt-12 overflow-x-auto px-6 sm:mx-0 sm:flex sm:justify-center sm:overflow-visible sm:px-0"
      >
        <MagneticDock
          items={dockItems}
          iconSize={56}
          maxScale={1.4}
          showLabels
          className="w-max"
        />
      </Reveal>

      <Reveal delay={0.15} className="mt-16 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="group flex items-start justify-between gap-4 border-b border-border py-4 transition-colors hover:border-brand/40"
          >
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">
                {service.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
            </div>
            <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
