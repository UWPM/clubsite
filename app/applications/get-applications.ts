import { FormSubmission, type TeamResponses } from "../apply/layouts/formSchema"
import { supabase } from "../apply/supabaseClient"

type TeamId = keyof TeamResponses;

export const TEAMS: { id: TeamId; name: string }[] = [
    { id: "engineering", name: "Engineering" },
    { id: "events", name: "Events" },
    { id: "marketing", name: "Marketing" },
    { id: "outreach", name: "Outreach" },
    { id: "podcast", name: "Podcast" },
    { id: "secretary", name: "Secretary" },
    { id: "finance", name: "Finance" },
]

export async function getApplications(): Promise<{ [key in TeamId]?: FormSubmission[] }> {
    const { data, error } = await supabase
        .from('applications')
        .select('*');

    if (error) {
        console.error('Error fetching applications:', error);
        throw error;
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