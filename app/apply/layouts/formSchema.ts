import { z } from "zod"

export const teamOptions = ["Secretary", "Events", "Marketing", "Podcast", "Engineering", "Finance", "Outreach"]
export const secondTeamOptions = [...teamOptions, "I am not interested in any other team"]


// Handle word count cap for textarea
export const handleWordCount = (e: React.ChangeEvent<HTMLTextAreaElement>, field: any, maxWords: number) => {
    const text = e.target.value;
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // If word count exceeds 100, stop further input
    if (wordCount < maxWords) {
        field.onChange(e);
    }
};

const conditionalField = (fieldName: string, selectedTeams: string[]) => {
  return z.string().nonempty({ message: "Please enter a response." }).optional().refine((val) => {
    const requiredTeams = selectedTeams.filter(team => team === fieldName);
    return requiredTeams.length === 0 || (val && val.length > 0);
  });
};

export type FormSubmission = {
  created_at: number;
  uw_email_address: string;
  full_name: string;
  program: string;
  term: string;
  term_type: string;
  on_campus: boolean;
  why_interested: string;
  first_choice_team: string;
  second_choice_team: string;
  resume_link: string;
}

export const formSchema = z.object({
    // Intro (mandatory for all applicants)
  email: z.string().regex(/.+@uwaterloo\.ca$/, { message: "Must be a valid UWaterloo email address." }),
  full_name: z.string().nonempty({ message: "Please enter your full name." }),
  program: z.string().nonempty({ message: "Please enter your program." }),
  term: z.string().nonempty({ message: "Please enter your current term." }),
  term_type: z.enum(["Work Term", "Study Term"], { message: "Please select a term type." }),
  on_campus: z.enum(["Yes", "No"], { message: "Please select yes or no." }),
  why_interested: z.string().nonempty({ message: "Please enter why you want to join UWPM." }),
  first_choice_team: z.enum(teamOptions as [string, ...string[]], { message: "Please select a team." }),
  second_choice_team: z.enum(secondTeamOptions as [string, ...string[]], { message: "Please select a team." }),
  resume_link: z.string().url({ message: "Please enter a valid URL." }),
  
  // CONDITIONAL FIELD SECTIONS BELOW
  // Events Team
  events_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  events_past_experience: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),

  // Secretary Team
  secretary_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  secretary_idea: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  secretary_team_conflict: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),

  // Marketing Team
  marketing_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  marketing_example_instagram_post: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  
  // Outreach Team
  outreach_interested_roles: z.array(z.string()).optional().superRefine((val: any, ctx: any) => {
    // Make sure that val is defined before applying validation
    if (!val) return;

    // Ensure ctx.parent exists and then check the teams
    const firstChoiceTeam = ctx.parent?.first_choice_team;
    const secondChoiceTeam = ctx.parent?.second_choice_team;
    
    // Only enforce role selection if "Outreach" is chosen as a team
    if (
      (firstChoiceTeam === "Outreach" || secondChoiceTeam === "Outreach") &&
      val.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select at least one role for the Outreach team.",
      });
    }
  }),
  outreach_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  outreach_experience: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  outreach_lead_experience: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),

  // Podcast Team
  podcast_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  podcast_example: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  
  // Engineering Team
  engineering_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  engineering_technical_challenge: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  engineering_project_link: z.string().url({ 
    message: "Please enter a valid URL." 
  }).optional(),
});

export type FormValues = z.infer<typeof formSchema>;