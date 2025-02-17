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

export type FormSubmission = {
  created_at: string;
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
  team_responses: {};
}

// Define the structure of the JSON column
export type TeamResponses = {
  engineering?: {
    choice_num: number;
    engineering_skills: string;
    engineering_technical_challenge: string;
    engineering_project_link: string;
  };
  finance?: {
    choice_num: number;
    finance_project: string;
    finance_time_management: string;
  };
  marketing?: {
    choice_num: number;
    marketing_skills: string;
    marketing_example_instagram_post: string;
  };
  outreach?: {
    choice_num: number;
    director_applicant: boolean;
    lead_applicant: boolean;
    outreach_skills: string;
    outreach_experience: string;
    outreach_lead_experience: string;
  };
  podcast?: {
    choice_num: number;
    podcast_skills: string;
    podcast_example: string;
  };
  secretary?: {
    choice_num: number;
    secretary_skills: string;
    secretary_idea: string;
    secretary_team_conflict: string;
  };
  events?: {
    choice_num: number;
    events_skills: string;
    events_past_experience: string;
  };
}

export const questionToText = {
  engineering_skills: 'What relevant experiences and skills make you a good fit for the role(s)?',
  engineering_technical_challenge: 'Briefly discuss one technical challenge that you faced during a project. How did you go about overcoming it?',
  engineering_project_link: 'Please provide us a link (Devpost, Github, anything) to a project that you are proud of!',

  events_skills: 'What relevant experiences and skills make you a good fit for the role?',
  events_past_experience: 'Describe a past experience where you successfully planned and executed a major event.',  

  marketing_skills: 'What relevant experiences and skills make you a good fit for the role(s)?',
  marketing_example_instagram_post: 'As part of the Marketing Team, you must be able to write social media posts and emails. Write an example Instagram post for the scenario above.',

  outreach_skills: 'What relevant experiences and skills make you a good fit for the role(s)?',
  outreach_experience: 'Describe a time when you successfully built a relationship with an external organization or individual to achieve a goal. What steps did you take?',
  outreach_lead_experience: 'Describe a time when you had to lead a team through a challenging external relations project?',

  podcast_skills: 'What relevant experiences and skills make you a good fit for the role(s)?',
  podcast_example: 'Share an example of a time when you had to tell a compelling story or explain a complex idea in an engaging way. How did you approach it?',
  
  secretary_skills: 'What relevant experiences and skills make you a good fit for the Secretary role?',
  secretary_idea: 'Propose an idea/strategy to improve the representation of our club externally.',
  secretary_team_conflict: 'Describe a time where you handled a team conflict.',

  finance_project: "Can you share an example of a project where you successfully developed and managed a tight budget?",
  finance_time_management: "This role requires work with tight deadlines. Describe a time when you had a tight deadline for the task and how you navigated the situation",
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

  // Finance Team
  finance_project: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
  finance_time_management: z.string().nonempty({ 
    message: "Please enter a response." 
  }).optional(),
});

export type FormValues = z.infer<typeof formSchema>;