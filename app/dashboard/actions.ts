"use server";

import { createClient } from "../apply/supabaseServer";
import { FormSubmission, type TeamResponses } from "../apply/layouts/formSchema"
import { TeamId, TEAMS } from "../apply/layouts/formSchema";

export async function getApplications(): Promise<{ [key in TeamId]?: FormSubmission[] }>  {
    const supabase = await createClient();

    const { data, error } = await supabase
            .from('applications')
            .select('*');

    if (error) {
        throw new Error("Failed to submit application");
    }


    // Group applications by team
    const groupedApplications: { [key in TeamId]?: FormSubmission[] } = {};
    
    data.forEach((application: FormSubmission) => {
        const teamId = (application.first_choice_team as TeamId).toLowerCase() as TeamId;
        if (!groupedApplications[teamId]) {
            groupedApplications[teamId] = [];
        }
        groupedApplications[teamId]?.push(application);
    });
    
    return groupedApplications;
}

export async function updateApplicationSelection(applicantId: string, selected: boolean): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("applications")
        .update({ selected })
        .eq("id", applicantId);

    if (error) {
        throw new Error("Failed to update selection status: ", error);
    }
}

export async function updateApplicationTag(applicantId: string, tag: string | null): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("applications")
        .update({ tag })
        .eq("id", applicantId);

    if (error) {
        throw new Error("Failed to update tag");
    }
}