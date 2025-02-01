import { z } from "zod"

export const teamOptions = ["Secretary", "Events", "Marketing", "Podcast", "Engineering", "Finance", "Outreach"]
export const secondTeamOptions = [...teamOptions, "I am not interested in any other team"]


// Handle word count cap for textarea
export const handleWordCount = (e: React.ChangeEvent<HTMLTextAreaElement>, field: any) => {
    const text = e.target.value;
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // If word count exceeds 100, stop further input
    if (wordCount < 100) {
        field.onChange(e);
    }
};

export const formSchema = z.object({
  email: z.string().email({     // change this to only accept @uwaterloo.ca domain
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
})