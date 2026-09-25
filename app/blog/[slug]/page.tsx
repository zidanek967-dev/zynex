import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta } from "@/components/sections/cta";
import { MarkdownContent } from "@/components/sections/markdown-content";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { getBlogPostBySlug } from "@/lib/supabase/queries";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return { title: "Blog" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: post.og_image_url ? [post.og_image_url] : post.cover_image_url ? [post.cover_image_url] : undefined,
      publishedTime: post.published_at,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: post.author_name,
    },
    image: post.og_image_url ?? post.cover_image_url ?? undefined,
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All posts
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold tracking-widest uppercase">
          {post.category}
        </span>
        <span>{formatDate(post.published_at)}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{post.reading_time_minutes} min read</span>
        <span aria-hidden="true">&middot;</span>
        <span>{post.author_name}</span>
      </Reveal>

      <SplitText
        as="h1"
        text={post.title}
        className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      />

      {post.cover_image_url && (
        <Reveal delay={0.1} className="relative mt-10 h-64 overflow-hidden rounded-3xl border border-border sm:h-96">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </Reveal>
      )}

      <Reveal delay={0.15} className="mt-12">
        <MarkdownContent content={post.content} />
      </Reveal>

      <div className="mt-16">
        <Cta />
      </div>
    </article>
  );
}
