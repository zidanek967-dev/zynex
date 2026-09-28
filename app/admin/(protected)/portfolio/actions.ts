"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function caseStudyFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    problem: String(formData.get("problem") ?? "").trim(),
    solution: String(formData.get("solution") ?? "").trim(),
    results: String(formData.get("results") ?? "").trim(),
    stack: parseList(formData.get("stack")),
    client_name: String(formData.get("client_name") ?? "").trim() || null,
    industry: String(formData.get("industry") ?? "").trim() || null,
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim() || null,
    gallery_image_urls: parseList(formData.get("gallery_image_urls")),
    published: formData.get("published") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createCaseStudy(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("case_studies").insert(caseStudyFromForm(formData));
  if (error) throw new Error(error.message);

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function updateCaseStudy(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("case_studies")
    .update(caseStudyFromForm(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function deleteCaseStudy(id: string, _formData?: FormData) {
  void _formData;
  const supabase = await createClient();
  await supabase.from("case_studies").delete().eq("id", id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}
