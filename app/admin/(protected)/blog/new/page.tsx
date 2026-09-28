import type { Metadata } from "next";

import { BlogPostForm } from "@/components/admin/blog-post-form";

import { createBlogPost } from "../actions";

export const metadata: Metadata = { title: "New post" };

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">New post</h1>
      <BlogPostForm action={createBlogPost} submitLabel="Create post" />
    </div>
  );
}
