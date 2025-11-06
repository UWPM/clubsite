"use server";

import { revalidatePath } from "next/cache";
import { FormSubmission } from "./layouts/prodconFormSchema";
import { createClient } from "./supabaseServer";

export async function submitApplication(formData: FormSubmission) {
  const supabase = await createClient();

  // Try to insert into the prodcon table. We store a compact payload with
  // a submission json column (if your table uses a different shape, the
  // returned Supabase error will tell us what to adjust).
  const payload = {
    submission: formData,
    app_type: formData.app_type ?? null,
    // normalize email for storage / comparison
    submitter_email: formData.submitter_email ? String(formData.submitter_email).toLowerCase().trim() : null,
    created_at: formData.created_at ?? new Date().toISOString(),
  };

  // Prevent duplicate submissions: if the submitter_email already exists, reject the insert
  if (payload.submitter_email) {
    const { data: existing, error: selectError } = await supabase
      .from("prodcon2025_applications")
      .select("id")
      .eq("submitter_email", payload.submitter_email)
      .limit(1);

    if (selectError) {
      throw new Error(selectError.message ?? JSON.stringify(selectError));
    }

    if (existing && (existing as any).length > 0) {
      throw new Error("An application with this email has already been submitted.");
    }
  }

  const { data, error } = await supabase
    .from("prodcon2025_applications")
    .insert([payload])
    .select("id")
    .single();

  if (error) {
    // Surface the underlying Supabase error message to make debugging easier
    throw new Error(error.message ?? JSON.stringify(error));
  }

  revalidatePath("/prodcon");
  return data;
}
