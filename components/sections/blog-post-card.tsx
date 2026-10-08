import Link from "next/link";

import type { BlogPost } from "@/lib/supabase/queries";

const COVER_GRADIENTS = [
  "linear-gradient(135deg, color-mix(in oklab, var(--brand) 32%, var(--surface)), var(--surface))",
  "linear-gradient(135deg, color-mix(in oklab, var(--brand-2) 28%, var(--surface)), var(--surface))",
  "linear-gradient(135deg, color-mix(in oklab, var(--brand-3) 24%, var(--surface)), var(--surface))",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPostCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass glow-border fx-card fx-tilt group flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <div
        className="relative h-40 w-full"
        style={{
          backgroundImage: post.cover_image_url
            ? `url(${post.cover_image_url})`
            : COVER_GRADIENTS[index % COVER_GRADIENTS.length],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="absolute left-4 top-4 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.14em] text-foreground uppercase backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-lg font-semibold text-foreground">{post.title}</h3>
        <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDate(post.published_at)}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{post.reading_time_minutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
