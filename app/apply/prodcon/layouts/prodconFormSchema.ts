import { z } from "zod";

// Handle word count cap for textarea
export const handleWordCount = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  field: any,
  maxWords: number,
) => {
  const text = e.target.value;
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // Allow input up to and including maxWords. If the user exceeds the limit,
  // refuse the additional change (this prevents the controlled field from updating).
  if (wordCount <= maxWords) {
    field.onChange(e);
  }
};

export const handleCharCount = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  field: any,
  maxChar: number,
) => {
  const text = e.target.value;
  const charCount = text.length;

  // Allow input up to and including maxChar characters. If the user exceeds
  // the limit, refuse the additional change so the controlled field doesn't update.
  if (charCount <= maxChar) {
    field.onChange(e);
  }
};

export type TeamMember = {
  name: string | null;
  email?: string | null;
  program?: string | null;
};

export type TeamData = {
  members: TeamMember[]; // 1-4 members
  open_to_grouping?: boolean;
  goal?: string | null;
  pm_interest?: string | null;
};

export type IndividualData = {
  name: string | null;
  email?: string | null;
  program?: string | null;
  goal?: string | null;
  pm_interest?: string | null;
};

export type FormSubmission = {
  // identifiers / timestamps
  id?: string; // optional DB id
  created_at?: string; // ISO timestamp when inserted

  // basic metadata
  app_type: "team" | "individual" | null;

  // payloads (one of these will be present depending on `app_type`)
  team?: TeamData;
  individual?: IndividualData;

  // contact / submitter convenience fields
  submitter_email?: string | null;

  // raw form values for debugging / future migration
  raw?: Record<string, any>;

  // optional server-side metadata
  meta?: {
    ip?: string | null;
    userAgent?: string | null;
  };
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
    "What does your team hope to gain from ProdCon 2025?",
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

export const prodconFormSchema = z.object({
  // application type: team or individual
  app_type: z.enum(["team", "individual"]),

  // Team fields (members 1-4)
  team_app_member1_name: z.string().optional(),
  team_app_member1_email: z.string().optional(),
  team_app_member1_prog: z.string().optional(),

  team_app_member2_name: z.string().optional(),
  team_app_member2_email: z.string().optional(),
  team_app_member2_prog: z.string().optional(),

  team_app_member3_name: z.string().optional(),
  team_app_member3_email: z.string().optional(),
  team_app_member3_prog: z.string().optional(),

  team_app_member4_name: z.string().optional(),
  team_app_member4_email: z.string().optional(),
  team_app_member4_prog: z.string().optional(),

  team_app_team_less_than_4: z.enum(["Yes", "No"]).optional(),
  team_app_goal: z.string().optional(),
  team_app_pm_interest: z.string().optional(),

  // Individual fields
  individual_app_name: z.string().optional(),
  individual_app_email: z.string().optional(),
  individual_app_prog: z.string().optional(),
  individual_app_goal: z.string().optional(),
  individual_app_pm_interest: z.string().optional(),
})

.superRefine((data, ctx) => {
  // If the applicant picked a team, ensure at least two teammate name+email pairs are provided
  if (data.app_type === "team") {
    const members = [
      { name: data.team_app_member1_name, email: data.team_app_member1_email, base: "team_app_member1" },
      { name: data.team_app_member2_name, email: data.team_app_member2_email, base: "team_app_member2" },
      { name: data.team_app_member3_name, email: data.team_app_member3_email, base: "team_app_member3" },
      { name: data.team_app_member4_name, email: data.team_app_member4_email, base: "team_app_member4" },
    ];

    // require at least two complete members (name + email)
    const completeCount = members.reduce((count, m) => {
      const hasName = typeof m.name === "string" && m.name.trim().length > 0;
      const hasEmail = typeof m.email === "string" && m.email.trim().length > 0;
      return count + (hasName && hasEmail ? 1 : 0);
    }, 0);

    if (completeCount < 2) {
      // Add issues for the first two member slots recommending both name and email
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Team applications require at least two members with name and email (provide teammate 1 and teammate 2).",
        path: ["team_app_member1_name"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Team applications require at least two members with name and email (provide teammate 1 and teammate 2).",
        path: ["team_app_member2_name"],
      });
    }
  }

  // If the applicant picked individual, require name and email
  if (data.app_type === "individual") {
    const name = data.individual_app_name;
    const email = data.individual_app_email;

    if (!(typeof name === "string" && name.trim().length > 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide your full name for individual applications.",
        path: ["individual_app_name"],
      });
    }

    if (!(typeof email === "string" && email.trim().length > 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide an email address for individual applications.",
        path: ["individual_app_email"],
      });
    }
  }
});
