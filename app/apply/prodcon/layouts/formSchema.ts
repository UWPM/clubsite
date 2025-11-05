import { z } from "zod";

// Handle word count cap for textarea
export const handleWordCount = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  field: any,
  maxWords: number,
) => {
  const text = e.target.value;
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // If word count exceeds 100, stop further input
  if (wordCount < maxWords) {
    field.onChange(e);
  }
};

export type FormSubmission = {
  
};

export const questionToText: { [key: string]: string } = {
  team_type:
    "Team or Individual Sign up?",
  team_app_member1_name:
    "Teammate 1 (You) Full Name",
  team_app_member1_email:
    "Teammate 1 (You) School Email",
  team_app_member1_prog:
    "Year and Program of teammate 1 (e.g. 2B Computer Science)",
  team_app_member2_name:
    "Teammate 2 Full Name",
  team_app_member2_email:
    "Teammate 2 School Email",
  team_app_member2_prog:
    "Year and Program of teammate 2 (e.g. 2B Computer Science)",
  team_app_member3_name:
    "Teammate 3 Full Name",
  team_app_member3_email:
    "Teammate 3 School Email",
  team_app_member3_prog:
    "Year and Program of teammate 3 (e.g. 2B Computer Science)",
  team_app_member4_name:
    "Teammate 4 Full Name",
  team_app_member4_email:
    "Teammate 4 School Email",
  team_app_member4_prog:
    "Year and Program of teammate 4 (e.g. 2B Computer Science)",
  team_app_team_less_than_4:
    "If you are signing up as a team of less than 4, are you open to being grouped with another team/individual?",
  team_app_goal:
    "What does your team hope to gain from ProdCon 2024?",
  team_app_pm_interest:
    "Why is your team interested in product management?",
  individual_app_name:
    "Full Name",
  individual_app_email:
    "School Email",
  individual_app_prog:
    "Year and Program (e.g. 2B Computer Science)",
  individual_app_goal:
    "What do you hope to gain out of ProdCon 2025?",
  individual_app_pm_interest:
    "Why are you interested in product management?",
};

export const formSchema = z.object({
  // application type: team or individual
  app_type: z.enum(["team", "individual"]).optional(),
})
