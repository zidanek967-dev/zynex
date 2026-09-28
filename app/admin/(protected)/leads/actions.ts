"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
}

export async function updateLeadNotes(id: string, notes: string) {
  const supabase = await createClient();
  await supabase.from("leads").update({ notes }).eq("id", id);
  revalidatePath("/admin/leads");
}
