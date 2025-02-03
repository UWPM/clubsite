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

export const formSchema = z.object({
  email: z.string().regex(/.+@uwaterloo\.ca$/, {     // only accepts @uwaterloo.ca domain
    message: "Must be a valid UWaterloo email address.",
  }),
  full_name: z.string().nonempty({
    message: "Please enter your full name.",
  }),
  program: z.string().nonempty({
    message: "Please enter your program.",
  }),
  term: z.string().nonempty({
    message: "Please enter your current term.",
  }),
  term_type: z.enum(["Work Term", "Study Term"], {
    message: "Please select a term type.",
  }),
  on_campus: z.enum(["Yes", "No"], {
    message: "Please select yes or no.",
  }),
  why_interested: z.string().nonempty({
    message: "Please enter why you want to join UWPM.",
  }),
  first_choice_team: z.enum(teamOptions as [string, ...string[]], {
    message: "Please select a team.",
  }),
  second_choice_team: z.enum(secondTeamOptions as [string, ...string[]], {
    message: "Please select a team.",
  }),
  resume_link: z.string().url({ message: "Please enter a valid URL." }),

  // Events Team
  events_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  events_past_experience: z.string().nonempty({ 
    message: "Please enter a response." 
  }),

  // Secretary Team
  secretary_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  secretary_idea: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  secretary_team_conflict: z.string().nonempty({ 
    message: "Please enter a response." 
  }),

  // Marketing Team
  marketing_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  marketing_example_instagram_post: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  
  // Outreach Team
  outreach_interested_roles: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  outreach_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  outreach_experience: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  outreach_lead_experience: z.string().nonempty({ 
    message: "Please enter a response." 
  }),

  // Podcast Team
  podcast_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  podcast_example: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  
  // Engineering Team
  engineering_skills: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  engineering_technical_challenge: z.string().nonempty({ 
    message: "Please enter a response." 
  }),
  engineering_project_link: z.string().url({ message: "Please enter a valid URL." }),

})