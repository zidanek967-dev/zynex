import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type CaseStudy = Tables<"case_studies">;
export type BlogPost = Tables<"blog_posts">;

export async function getCaseStudies() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getCaseStudyBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function getBlogPosts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();
  return data;
}
