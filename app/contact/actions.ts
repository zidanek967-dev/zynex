"use server";

import { createClient } from "@/lib/supabase/server";
import { leadSchema, type LeadFormValues } from "@/lib/validations/lead";

export async function submitLead(
  values: LeadFormValues,
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Some fields need a second look." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    project_type: parsed.data.projectType,
    features: parsed.data.features,
    timeline: parsed.data.timeline,
    budget_range: parsed.data.budgetRange,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    company: parsed.data.company || null,
    message: parsed.data.message || null,
  });

  if (error) {
    return { success: false, error: "Something went wrong on our end. Try again or reach out on WhatsApp." };
  }

  return { success: true };
}
