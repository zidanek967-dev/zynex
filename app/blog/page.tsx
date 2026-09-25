import type { Metadata } from "next";

import { BlogGrid } from "@/components/sections/blog-grid";
import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { getBlogPosts } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on AI-built software, product strategy, and how ZYNEX ships.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col gap-20 py-24 sm:py-32">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">Blog</span>
        <SplitText
          as="h1"
          text="Notes on building with AI"
          className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        />
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          Thoughts on AI-built software, product strategy, and how we ship in days.
        </p>
      </Reveal>

      <div className="mx-auto w-full max-w-6xl px-6">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">Posts coming soon.</p>
        ) : (
          <BlogGrid posts={posts} />
        )}
      </div>

      <Cta />
    </div>
  );
}
