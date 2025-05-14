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

    // Group applications by both first_choice_team and second_choice_team
    const groupedApplications: { [key in TeamId]?: FormSubmission[] } = {};

    data.forEach((application: FormSubmission) => {
        // Process first choice team
        const firstTeamId = (application.first_choice_team as TeamId).toLowerCase() as TeamId;
        if (!groupedApplications[firstTeamId]) {
            groupedApplications[firstTeamId] = [];
        }
        groupedApplications[firstTeamId]?.push(application);

        // Process second choice team
        if (application.second_choice_team) {
            const secondTeamId = (application.second_choice_team as TeamId).toLowerCase() as TeamId;
            if (!groupedApplications[secondTeamId]) {
                groupedApplications[secondTeamId] = [];
            }
            groupedApplications[secondTeamId]?.push(application);
        }
    });

    // console.log(groupedApplications["newsletter"]);
    
    return groupedApplications;
}

export async function updateApplicationSelection(applicantId: string, selected: boolean, first_choice: boolean): Promise<void> {
    const supabase = await createClient();
    // update first choice selection status
    if (first_choice) {
        const { error } = await supabase
            .from("applications")
            .update({ selected_first_choice: selected })
            .eq("id", applicantId);
        if (error) {
            throw new Error("Failed to update first choice selection status: ", error);
        }
    }
    // update second choice team selection status
    else {
        const { error } = await supabase
            .from("applications")
            .update({ selected_second_choice: selected })
            .eq("id", applicantId);
        if (error) {
            throw new Error("Failed to update second choice selection status: ", error);
        }
    }
}

export async function updateApplicationTag(applicantId: string, tag: string | null, first_choice: boolean): Promise<void> {
    const supabase = await createClient();

    // update first choice tag
    if (first_choice) {
        const { error } = await supabase
            .from("applications")
            .update({ tag_first_choice: tag })
            .eq("id", applicantId);

        if (error) {
            throw new Error("Failed to update first choice tag");
        }
    }
    // update second choice tag
    else {
        const { error } = await supabase
            .from("applications")
            .update({ tag_second_choice: tag })
            .eq("id", applicantId);

        if (error) {
            throw new Error("Failed to update second choice tag");
        }
    }
}