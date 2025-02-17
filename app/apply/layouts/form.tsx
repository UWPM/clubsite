"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { formSchema } from "./formSchema"
import { FormSubmission, TeamResponses } from "./formSchema"

import { supabase } from '../supabaseClient';

// Form Sections
import { Intro } from "./form_sections/intro"
import { Events } from "./form_sections/events"
import { Secretary } from "./form_sections/secretary"
import { Marketing } from "./form_sections/marketing"
import { Outreach } from "./form_sections/outreach"
import { Podcast } from "./form_sections/podcast"
import { Engineering } from "./form_sections/engineering"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Finance } from "./form_sections/finance"


export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // resolver: undefined,
    defaultValues: {
      // Add default values here.
      email: "",
      full_name: "",
      program: "",
      term: "",
      term_type: "Work Term",
      on_campus: "No",
      why_interested: "",
      first_choice_team: "",
      second_choice_team: "",
      resume_link: "",

      // Outreach
      outreach_interested_roles: [],
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Clean up data before submission: remove empty arrays.
    if (values.outreach_interested_roles && values.outreach_interested_roles.length === 0) {
      delete values.outreach_interested_roles;
    }

    // Data mapping
    const submission: FormSubmission = {
      created_at: new Date().toISOString(),
      uw_email_address: values.email,
      full_name: values.full_name,
      program: values.program,
      term: values.term,
      term_type: values.term_type,
      on_campus: values.on_campus === "Yes" ? true : false,
      why_interested: values.why_interested,
      first_choice_team: values.first_choice_team,
      second_choice_team: values.second_choice_team,
      resume_link: values.resume_link,
      team_responses: {} as TeamResponses,
    }
    
    console.log('values', values);

    // Populate the `team_responses` dynamically based on selected teams
    const teamResponses: TeamResponses = {};

    if (values.first_choice_team === "Engineering" || values.second_choice_team === "Engineering") {
      teamResponses.engineering = {
        choice_num: values.first_choice_team === "Engineering" ? 1 : 2,
        engineering_skills: values.engineering_skills || "",
        engineering_technical_challenge: values.engineering_technical_challenge || "",
        engineering_project_link: values.engineering_project_link || "",
      };
    }

    if (values.first_choice_team === "Marketing" || values.second_choice_team === "Marketing") {
      teamResponses.marketing = {
        choice_num: values.first_choice_team === "Marketing" ? 1 : 2,
        marketing_skills: values.marketing_skills || "",
        marketing_example_instagram_post: values.marketing_example_instagram_post || "",
      };
    }

    if (values.first_choice_team === "Outreach" || values.second_choice_team === "Outreach") {
      teamResponses.outreach = {
        choice_num: values.first_choice_team === "Outreach" ? 1 : 2,
        director_applicant: values.outreach_interested_roles?.includes("director") || false,
        lead_applicant: values.outreach_interested_roles?.includes("lead") || false,
        outreach_skills: values.outreach_skills || "",
        outreach_experience: values.outreach_experience || "",
        outreach_lead_experience: values.outreach_lead_experience || "",
      };
    }

    if (values.first_choice_team === "Podcast" || values.second_choice_team === "Podcast") {
      teamResponses.podcast = {
        choice_num: values.first_choice_team === "Podcast" ? 1 : 2,
        podcast_skills: values.podcast_skills || "",
        podcast_example: values.podcast_example || "",
      };
    }

    if (values.first_choice_team === "Secretary" || values.second_choice_team === "Secretary") {
      teamResponses.secretary = {
        choice_num: values.first_choice_team === "Secretary" ? 1 : 2,
        secretary_skills: values.secretary_skills || "",
        secretary_idea: values.secretary_idea || "",
        secretary_team_conflict: values.secretary_team_conflict || "",
      };
    }

    if (values.first_choice_team === "Events" || values.second_choice_team === "Events") {
      teamResponses.events = {
        choice_num: values.first_choice_team === "Events" ? 1 : 2,
        events_skills: values.events_skills || "",
        events_past_experience: values.events_past_experience || "",
      };
    }
    
    if (values.first_choice_team === "Finance" || values.second_choice_team === "Finance") {
      teamResponses.finance = {
        choice_num: values.first_choice_team === "Finance" ? 1 : 2,
        finance_project: values.finance_project || "",
        finance_time_management: values.finance_time_management || "",
      };
    }

    // Attach team responses JSON to the submission data
    submission.team_responses = teamResponses;

    console.log(submission);

    const { data: appData, error: appError } = await supabase
      .from("applications")
      .insert([submission])
      .select("id")
      .single();

    if (appError) {
      console.error("Error inserting data:", appError);
    } else {
      console.log("Data inserted successfully", appData);
    }
  }
  
  const { control, watch } = form;
  const selectedTeams = watch(["first_choice_team", "second_choice_team"]);
  
  // console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <Intro control={form.control} />
        
        {selectedTeams.includes("Events") && <Events control={form.control}/>}
        {selectedTeams.includes("Secretary") && <Secretary control={form.control} />}
        {selectedTeams.includes("Marketing") && <Marketing control={form.control} />}
        {selectedTeams.includes("Outreach") && <Outreach control={form.control} />}
        {selectedTeams.includes("Podcast") && <Podcast control={form.control} />}
        {selectedTeams.includes("Engineering") && <Engineering control={form.control} />}
        {selectedTeams.includes("Finance") && <Finance control={form.control} />}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
