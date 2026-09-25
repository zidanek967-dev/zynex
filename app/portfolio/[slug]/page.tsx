import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { getCaseStudyBySlug } from "@/lib/supabase/queries";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) return { title: "Case Study" };

  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      images: study.cover_image_url ? [study.cover_image_url] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <Reveal>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-6 flex flex-wrap items-center gap-3">
        {study.industry && (
          <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {study.industry}
          </span>
        )}
        {study.client_name && (
          <span className="text-sm text-muted-foreground">{study.client_name}</span>
        )}
      </Reveal>

      <SplitText
        as="h1"
        text={study.title}
        className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      />

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{study.summary}</p>
      </Reveal>

      {study.cover_image_url && (
        <Reveal delay={0.15} className="relative mt-10 h-64 overflow-hidden rounded-3xl border border-border sm:h-96">
          <Image
            src={study.cover_image_url}
            alt={study.title}
            fill
            sizes="(min-width: 768px) 896px, 100vw"
            className="object-cover"
            priority
          />
        </Reveal>
      )}

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-xl font-semibold text-foreground">The problem</h2>
          <p className="mt-3 text-muted-foreground">{study.problem}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-xl font-semibold text-foreground">The solution</h2>
          <p className="mt-3 text-muted-foreground">{study.solution}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-14">
        <h2 className="font-display text-xl font-semibold text-foreground">Results</h2>
        <p className="mt-3 text-muted-foreground">{study.results}</p>
      </Reveal>

      {study.stack.length > 0 && (
        <Reveal delay={0.15} className="mt-14">
          <h2 className="font-display text-xl font-semibold text-foreground">Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      )}

      {study.gallery_image_urls.length > 0 && (
        <Reveal delay={0.2} className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {study.gallery_image_urls.map((url) => (
            <div key={url} className="relative h-56 overflow-hidden rounded-2xl border border-border">
              <Image src={url} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </Reveal>
      )}

      <Reveal delay={0.25} className="mt-16">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 font-medium text-brand transition-colors hover:text-foreground"
        >
          Start a project like this
          <ArrowUpRight className="size-4" />
        </Link>
      </Reveal>

      <div className="mt-24">
        <Cta />
      </div>
    </article>
  );
}
