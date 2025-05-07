"use server";

import { revalidatePath } from "next/cache";
import { FormSubmission } from "./layouts/formSchema";
import { createClient } from "./supabaseServer";

export async function submitApplication(formData: FormSubmission) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("applications")
    .insert([formData])
    .select("id")
    .single();

  if (error) {
    throw new Error("Failed to submit application");
  }

  revalidatePath("/apply");
  return data;
}
