import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}


// --- Convenience server helpers -------------------------------------------------
// These helpers fetch rows from Supabase and format them into the shapes used by
// the frontend (separating individual and team applications).

import fs from "fs";
import type { FormSubmission, TeamData, IndividualData, TeamMember } from "./layouts/prodconFormSchema";

export async function fetchAllApplications() {
  const supabase = await createClient();

  // Try to select specific columns first for smaller payloads. If the
  // `app_type` column doesn't exist in the table, fall back to selecting
  // all columns so this helper works with different schemas.
  let data: any[] | null = null;
  let error: any = null;

  try {
    const res = await supabase
      .from("prodcon2025_applications")
      .select("*")
      .order("created_at", { ascending: false });
    data = res.data;
    error = res.error;

  } catch (e) {
    // Propagate unexpected exceptions
    throw e;
  }

  if (error) throw error;

  const rows = (data ?? []) as any[];

  const individuals: FormSubmission[] = [];
  const teams: FormSubmission[] = [];

  for (const r of rows) {
    // Build a FormSubmission object that follows the prodconFormSchema types
    const base: FormSubmission = {
      id: r.id,
      created_at: r.created_at,
      app_type: r.app_type ?? null,
      submitter_email: r.submission.submitter_email ?? null,
    };

    // If the `app_type` column is missing or null, attempt to infer type from
    // the structured columns or raw form fields.
    const inferredAppType = r.app_type

    if (inferredAppType === "individual") {
      const individual: IndividualData =
        r.individual ?? {
          name: r.submission.raw?.individual_app_name ?? null,
          email: r.submission.raw?.individual_app_email ?? null,
          program: r.submission.raw?.individual_app_prog ?? null,
          goal: r.submission.raw?.individual_app_goal ?? null,
          pm_interest: r.submission.raw?.individual_app_pm_interest ?? null,
        };

  const formatted: FormSubmission = { ...base, individual };
  individuals.push(formatted);
  } else if (inferredAppType === "team") {
      // build members array from structured column or fall back to raw fields
      const members: TeamMember[] =
        (r.submission.raw
          ? [1, 2, 3, 4]
              .map((i) => {
                const name = r.submission.raw[`team_app_member${i}_name`];
                const email = r.submission.raw[`team_app_member${i}_email`];
                const program = r.submission.raw[`team_app_member${i}_prog`];
                return {
                  name: name && name !== "" ? name : null,
                  email: email && email !== "" ? email : null,
                  program: program && program !== "" ? program : null,
                } as TeamMember;
              })
              .filter((m: TeamMember) => m.name || m.email || m.program)
          : []);

      const open_to_grouping =
        r.team?.open_to_grouping ?? true;

      const teamObj: TeamData =
        r.team ?? {
          team_size: members.length || 0,
          members,
          open_to_grouping,
          goal: r.submission.raw?.team_app_goal ?? null,
          pm_interest: r.submission.raw?.team_app_pm_interest ?? null,
        };

  const formatted: FormSubmission = { ...base, team: teamObj };
  teams.push(formatted);
    } else {
      // Unknown or missing app_type — skip (neither team nor individual)
    }
  }

  return { individuals, teams};
}

// BELOW FUNCTION IS ONLY FOR TESTING
// Fetch raw rows from the applications table without any processing. This returns exactly what Supabase/PostgREST returns for the select query.
export async function fetchRawApplications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prodcon2025_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as any[];
}