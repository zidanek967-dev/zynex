import type { Metadata } from "next";

import { CaseStudyForm } from "@/components/admin/case-study-form";

import { createCaseStudy } from "../actions";

export const metadata: Metadata = { title: "New case study" };

export default function NewCaseStudyPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">New case study</h1>
      <CaseStudyForm action={createCaseStudy} submitLabel="Create case study" />
    </div>
  );
}
