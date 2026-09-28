import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

import { deleteBlogPost } from "./actions";

export const metadata: Metadata = { title: "Blog" };

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Blog</h1>
        <Button render={<Link href="/admin/blog/new" />}>New post</Button>
      </div>

      {!posts || posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="glass glow-border flex items-center justify-between gap-4 rounded-2xl border border-border p-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {post.title}{" "}
                  {!post.published ? (
                    <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
                      Draft
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted-foreground">
                  /blog/{post.slug} · {post.category}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button variant="outline" size="sm" render={<Link href={`/admin/blog/${post.id}`} />}>
                  Edit
                </Button>
                <form action={deleteBlogPost.bind(null, post.id)}>
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
