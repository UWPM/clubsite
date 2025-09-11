import { z } from "zod";

export type TeamId = keyof TeamResponses;
export const TEAMS: { id: TeamId; name: string }[] = [
    { id: "events", name: "Events" },
    { id: "marketing", name: "Marketing" },
    { id: "outreach", name: "Outreach" },
    { id: "podcast", name: "Podcast" },
    { id: "secretary", name: "Secretary" },
    { id: "finance", name: "Finance" },
    { id: "design", name: "Design" },
    { id: "newsletter", name: "Newsletter" },
    { id: "engineering", name: "Engineering" },
]

export const teamOptions = [
  "Secretary",
  "Events",
  "Marketing",
  "Podcast",
  "Engineering",
  "Finance",
  "Outreach",
  "Newsletter",
  "Design",
];
export const secondTeamOptions = [
  ...teamOptions,
  "I am not interested in any other team",
];

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
  id?: string;
  created_at: string;
  uw_email_address: string;
  full_name: string;
  program: string;
  term: string;
  term_type: string;
  on_campus: boolean;
  why_interested: string;
  first_choice_team: string;
  second_choice_team: string | undefined;
  resume_link: string;
  team_responses: {};
  tag_first_choice?: string | null; 
  tag_second_choice?: string | null
  selected_first_choice?: boolean
  selected_second_choice?: boolean
};

// Define the structure of the JSON column
export type TeamResponses = {
  engineering?: {
    choice_num: number;
    engineering_skills: string;
    engineering_technical_challenge: string;
    engineering_project_link: string;
  };
  finance?: {
    lead_applicant: boolean;
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
    lead_applicant: boolean;
    choice_num: number;
    outreach_skills: string;
    outreach_experience: string;
  };
  podcast?: {
    lead_applicant: boolean;
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
    lead_applicant: boolean;
    choice_num: number;
    events_skills: string;
    events_past_experience: string;
  };
  newsletter?: {
    choice_num: number;
  };
  design?: {
    lead_applicant: boolean;
    choice_num: number;
  };
};

export const questionToText: { [key: string]: string } = {
  engineering_skills:
    "What relevant experiences and skills make you a good fit for the role(s)?",
  engineering_technical_challenge:
    "Briefly discuss one technical challenge that you faced during a project. How did you go about overcoming it?",
  engineering_project_link:
    "Please provide us a link (Devpost, Github, anything) to a project that you are proud of!",

  events_skills:
    "What relevant experiences and skills make you a good fit for the role?",
  events_past_experience:
    "Describe a past experience where you successfully planned and executed a major event.",

  marketing_skills:
    "What relevant experiences and skills make you a good fit for the role(s)?",
  marketing_example_instagram_post:
    "As part of the Marketing Team, you must be able to write social media posts and emails. Write an example Instagram post for the scenario above.",

  outreach_skills:
    "What relevant experiences and skills make you a good fit for the role(s)?",
  outreach_experience:
    "Describe a time when you successfully built a relationship with an external organization or individual to achieve a goal. What steps did you take?",

  podcast_skills:
    "What relevant experiences and skills make you a good fit for the role(s)?",
  podcast_example:
    "Share an example of a time when you had to tell a compelling story or explain a complex idea in an engaging way. How did you approach it?",

  secretary_skills:
    "What relevant experiences and skills make you a good fit for the Secretary role?",
  secretary_idea:
    "Propose an idea/strategy to improve the representation of our club externally.",
  secretary_team_conflict: "Describe a time where you handled a team conflict.",

  finance_project:
    "Can you share an example of a project where you successfully developed and managed a tight budget?",
  finance_time_management:
    "This role requires work with tight deadlines. Describe a time when you had a tight deadline for the task and how you navigated the situation",
};

export const terms = [
  "1A",
  "1B",
  "2A",
  "2B",
  "3A",
  "3B",
  "4A",
  "4B",
  "5A",
  "5B",
];

export const formSchema = z.object({
  // Intro (mandatory for all applicants)
  email: z.string().regex(/.+@uwaterloo\.ca$/, {
    message: "Must be a valid UWaterloo email address.",
  }),
  // email: z.string().email({ message: "Must be a valid UWaterloo email address." }),
  full_name: z.string().nonempty({ message: "Please enter your full name." }),
  program: z.string().nonempty({ message: "Please enter your program." }),
  term: z.string().nonempty({ message: "Please enter your current term." }),
  term_type: z.enum(["Work Term", "Study Term"], {
    message: "Please select a term type.",
  }),
  on_campus: z.enum(["Yes", "No"], { message: "Please select yes or no." }),
  why_interested: z
    .string()
    .nonempty({ message: "Please enter why you want to join UWPM." }),
  first_choice_team: z.enum(teamOptions as [string, ...string[]], {
    message: "Please select a team.",
  }),
  second_choice_team: z.enum(secondTeamOptions as [string, ...string[]], {
    message: "Please select a team.",
  }),
  resume_link: z.string().url({ message: "Please enter a valid URL." }),
  
  // Role selection per team (no VP roles)
  finance_role: z.enum(["director"] as const, {
    message: "Please select a role.",
  }).optional(),
  
  events_role: z.enum(["director", "lead"] as const, {
    message: "Please select a role.",
  }).optional(),
  
  podcast_role: z.enum(["director"] as const, {
    message: "Please select a role.",
  }).optional(),

  marketing_role: z.enum(["director"] as const, {
    message: "Please select a role.",
  }).optional(),

  outreach_role: z.enum(["director", "lead"] as const, {
    message: "Please select a role.",
  }).optional(),

  engineering_role: z.enum(["director"] as const, {
    message: "Please select a role.",
  }).optional(),

  design_role: z.enum(["director", "lead"] as const, {
    message: "Please select a role.",
  }).optional(),

  newsletter_role: z.enum(["director"] as const, {
    message: "Please select a role.",
  }).optional(),
  
  // CONDITIONAL FIELD SECTIONS BELOW
  // Events Team
  events_skills: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  events_past_experience: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),

  // Secretary Team
  secretary_skills: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  secretary_idea: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  secretary_team_conflict: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),

  // Marketing Team
  marketing_skills: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  marketing_example_instagram_post: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),

  outreach_skills: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  outreach_experience: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),

  // Podcast Team
  podcast_skills: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  podcast_example: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),

  // Engineering Team
  engineering_skills: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  engineering_technical_challenge: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  engineering_project_link: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),

  // Finance Team
  finance_project: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
  finance_time_management: z
    .string()
    .nonempty({
      message: "Please enter a response.",
    })
    .optional(),
}).refine((data) => {
  // If Finance team is selected, finance_role is required
  const isFinanceSelected = 
    data.first_choice_team === "Finance" || 
    data.second_choice_team === "Finance";
  
  if (isFinanceSelected && !data.finance_role) {
    return false;
  }
  return true;
}, {
  message: "Please select a role for Finance team.",
  path: ["finance_role"], // This specifies which field the error is associated with
}).refine((data) => {
  // If Events team is selected, events_role is required
  const isEventsSelected = 
    data.first_choice_team === "Events" || 
    data.second_choice_team === "Events";
  
  if (isEventsSelected && !data.events_role) {
    return false;
  }
  return true;
}, {
  message: "Please select a role for Events team.",
  path: ["events_role"], // This specifies which field the error is associated with
}).refine((data) => {
  // If Podcast team is selected, podcast_role is required
  const isPodcastSelected = 
    data.first_choice_team === "Podcast" || 
    data.second_choice_team === "Podcast";
  
  if (isPodcastSelected && !data.podcast_role) {
    return false;
  }
  return true;
}, {
  message: "Please select a role for Podcast team.",
  path: ["podcast_role"], // This specifies which field the error is associated with
}).refine((data) => {
  // If Marketing team is selected, marketing_role is required
  const isMarketingSelected =
    data.first_choice_team === "Marketing" ||
    data.second_choice_team === "Marketing";

  if (isMarketingSelected && !data.marketing_role) {
    return false;
  }
  return true;
}, {
  message: "Please select a role for Marketing team.",
  path: ["marketing_role"],
}).refine((data) => {
  // If Outreach team is selected, outreach_role is required
  const isOutreachSelected =
    data.first_choice_team === "Outreach" ||
    data.second_choice_team === "Outreach";

  if (isOutreachSelected && !data.outreach_role) {
    return false;
  }
  return true;
}, {
  message: "Please select a role for Outreach team.",
  path: ["outreach_role"],
}).refine((data) => {
  // If Engineering team is selected, engineering_role is required
  const isEngineeringSelected =
    data.first_choice_team === "Engineering" ||
    data.second_choice_team === "Engineering";

  if (isEngineeringSelected && !data.engineering_role) {
    return false;
  }
  return true;
}, {
  message: "Please select a role for Engineering team.",
  path: ["engineering_role"],
}).refine((data) => {
  // If Design team is selected, design_role is required
  const isDesignSelected =
    data.first_choice_team === "Design" ||
    data.second_choice_team === "Design";

  if (isDesignSelected && !data.design_role) {
    return false;
  }
  return true;
}, {
  message: "Please select a role for Design team.",
  path: ["design_role"],
}).refine((data) => {
  // If Newsletter team is selected, newsletter_role is required
  const isNewsletterSelected =
    data.first_choice_team === "Newsletter" ||
    data.second_choice_team === "Newsletter";

  if (isNewsletterSelected && !data.newsletter_role) {
    return false;
  }
  return true;
}, {
  message: "Please select a role for Newsletter team.",
  path: ["newsletter_role"],
});