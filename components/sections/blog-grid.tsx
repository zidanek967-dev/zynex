"use client";

import { useMemo, useState } from "react";

import { BlogPostCard } from "@/components/sections/blog-post-card";
import { Reveal } from "@/components/motion/reveal";
import type { BlogPost } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {categories.length > 2 && (
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === category
                  ? "border-brand bg-brand/15 text-foreground"
                  : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No posts in this category yet.</p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.1}>
              <BlogPostCard post={post} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
