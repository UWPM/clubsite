"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { teamOptions, secondTeamOptions, formSchema } from "./formSchema"

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
      outreach_interested_roles: [""],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <Intro control={form.control} />
        
        <Events control={form.control}/>
        <Secretary control={form.control} />
        <Marketing control={form.control} />
        <Outreach control={form.control} />
        <Podcast control={form.control} />
        <Engineering control={form.control} />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
