"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useCallback, useEffect } from "react"

import { formSchema } from "./formSchema"
import { FormSubmission, TeamResponses } from "./formSchema"

import { Card, CardContent } from "@/components/ui/card"
import useEmblaCarousel from "embla-carousel-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { supabase } from '../supabaseClient';

// Form Sections
import { Intro } from "./form_sections/intro"
import { Events } from "./form_sections/events"
import { Secretary } from "./form_sections/secretary"
import { Marketing } from "./form_sections/marketing"
import { Outreach } from "./form_sections/outreach"
import { Podcast } from "./form_sections/podcast"
import { Engineering } from "./form_sections/engineering"
import { Finance } from "./form_sections/finance"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/ui/spinner"

export function ProfileForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

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
    setSubmitting(true);

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
      second_choice_team: values.second_choice_team == "I am not interested in any other team" ? undefined : values.second_choice_team,
      resume_link: values.resume_link,
      team_responses: {} as TeamResponses,
    }
    
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
      setSubmitError(true);
      setEmail(null);
    } else {
      console.log("Data inserted successfully", appData);
      setSubmitted(true);
      setEmail(values.email);
      
      // trigger confirmation email via the API route
      try {
        const response = await fetch("/api/email", {
          method: "GET", // GET for testing, will be POST in production
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ email: values.email, fullName: values.full_name }),
        });
        if (!response.ok) throw new Error("Failed to trigger email");
        console.log("Email trigger response:", await response.json());
      } catch (error) {
        console.error("Error triggering email:", error);
      }
    }

    setSubmitting(false);
  }
  
  // Team choice logic
  const { control, watch } = form;
  const selectedTeams = watch(["first_choice_team", "second_choice_team"]);
  
  // Carousel config //////////////////////////////////////////////////////////////
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [currentSlide, setCurrentSlide] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentSlide(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [emblaApi]) // Removed selectedTeams from dependencies
  
  const slides = [
    { id: "intro", component: <Intro control={control} /> },
    ...(selectedTeams.includes("Events") ? [{ id: "events", component: <Events control={control} /> }] : []),
    ...(selectedTeams.includes("Secretary") ? [{ id: "secretary", component: <Secretary control={control} /> }] : []),
    ...(selectedTeams.includes("Marketing") ? [{ id: "marketing", component: <Marketing control={control} /> }] : []),
    ...(selectedTeams.includes("Outreach") ? [{ id: "outreach", component: <Outreach control={control} /> }] : []),
    ...(selectedTeams.includes("Podcast") ? [{ id: "podcast", component: <Podcast control={control} /> }] : []),
    ...(selectedTeams.includes("Engineering") ? [{ id: "engineering", component: <Engineering control={control} /> }] : []),
    ...(selectedTeams.includes("Finance") ? [{ id: "finance", component: <Finance control={control} /> }] : []),
  ]

  //////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 relative select-none transition-opacity">
          <div className="w-full mx-auto relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((slide, index) => (
                  <div className="flex-[0_0_100%]" key={slide.id}>
                    <Card className="h-[80vh] relative m-1 rounded-xl">
                      <CardContent className="absolute inset-0 p-6 overflow-y-auto">{slide.component}</CardContent>
                      <div className="absolute top-8 right-8 px-2 py-1 border border-zinc-200 rounded-md bg-zinc-50 shadow-lg">
                        Step <strong>{index + 1}</strong> <span className="text-zinc-500">of {slides.length}</span>
                      </div>
      
                      <div className="absolute bottom-4 left-4">
                        {index > 0 && (
                          <Button onClick={scrollPrev} variant="outline" type="button">
                            Previous
                          </Button>
                        )}
                      </div>
                      <div className="absolute bottom-4 right-4">
                        {index < slides.length - 1 && (
                          <Button onClick={scrollNext} variant="outline" type="button">
                            Next
                          </Button>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit" className="right-4 absolute">Submit</Button>
        </form>
      </Form>

      {submitting && 
        <Spinner size="small" />
      }

      {/* Dialog for submission feedback */}
      <Dialog open={submitted || submitError} onOpenChange={(open) => {
        if (!open) {
          setSubmitted(false);
          setSubmitError(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{submitted ? "Submission Successful" : "Submission Failed"}</DialogTitle>
            <DialogDescription>
              {submitted
                ? `Thank you for applying to UWPM! Please check your inbox (${email}) for a confirmation email.`
                : "There was an error submitting your application. Please try again."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button
              variant={submitted ? "default" : "destructive"}
              onClick={() => {
                setSubmitted(false);
                setSubmitError(false);
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
