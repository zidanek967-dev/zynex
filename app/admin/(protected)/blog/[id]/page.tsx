import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BlogPostForm } from "@/components/admin/blog-post-form";
import { createClient } from "@/lib/supabase/server";

import { updateBlogPost } from "../actions";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">Edit post</h1>
      <BlogPostForm
        action={updateBlogPost.bind(null, id)}
        defaultValues={post}
        submitLabel="Save changes"
      />
    </div>
  );
}
