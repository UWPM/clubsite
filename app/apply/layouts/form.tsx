"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { formSchema } from "./formSchema"
import { FormSubmission } from "./formSchema"

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
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Clean up data before submission: remove empty arrays.
    if (values.outreach_interested_roles && values.outreach_interested_roles.length === 0) {
      delete values.outreach_interested_roles;
    }

    // Data mapping
    const submission: FormSubmission = {
      created_at: Date.now(),
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
    }
    

    console.log(submission);
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
