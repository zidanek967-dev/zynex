"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function blogPostFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || "General",
    reading_time_minutes: Number(formData.get("reading_time_minutes") || 4),
    author_name: String(formData.get("author_name") ?? "").trim() || "ZYNEX Team",
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim() || null,
    og_image_url: String(formData.get("og_image_url") ?? "").trim() || null,
    published: formData.get("published") === "on",
  };
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert(blogPostFromForm(formData));
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").update(blogPostFromForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string, _formData?: FormData) {
  void _formData;
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
