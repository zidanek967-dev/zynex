import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CaseStudyForm } from "@/components/admin/case-study-form";
import { createClient } from "@/lib/supabase/server";

import { updateCaseStudy } from "../actions";

export const metadata: Metadata = { title: "Edit case study" };

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: caseStudy } = await supabase
    .from("case_studies")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!caseStudy) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">Edit case study</h1>
      <CaseStudyForm
        action={updateCaseStudy.bind(null, id)}
        defaultValues={caseStudy}
        submitLabel="Save changes"
      />
    </div>
  );
}
