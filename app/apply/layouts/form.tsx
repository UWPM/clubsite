"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useCallback, useEffect } from "react";

import { formSchema } from "./formSchema";
import { FormSubmission, TeamResponses } from "./formSchema";

import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";

// Form Sections
import { Intro } from "./form_sections/intro";
import { Events } from "./form_sections/events";
import { Secretary } from "./form_sections/secretary";
import { Marketing } from "./form_sections/marketing";
import { Outreach } from "./form_sections/outreach";
import { Podcast } from "./form_sections/podcast";
import { Engineering } from "./form_sections/engineering";
import { Finance } from "./form_sections/finance";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import SubmissionDialog from "./dialog";

import { submitApplication } from "../actions";

export function ProfileForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submissionObject, setSubmissionObject] =
    useState<FormSubmission | null>(null);

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
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    console.log("Submitting");
    
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
      second_choice_team:
        values.second_choice_team == "I am not interested in any other team"
          ? undefined
          : values.second_choice_team,
      resume_link: values.resume_link,
      team_responses: {} as TeamResponses,
    };
  
    // Populate the team_responses dynamically based on selected teams
    const teamResponses: TeamResponses = {};
  
    // if (
    //   values.first_choice_team === "Engineering" ||
    //   values.second_choice_team === "Engineering"
    // ) {
    //   teamResponses.engineering = {
    //     choice_num: values.first_choice_team === "Engineering" ? 1 : 2,
    //     engineering_skills: values.engineering_skills || "",
    //     engineering_technical_challenge:
    //       values.engineering_technical_challenge || "",
    //     engineering_project_link: values.engineering_project_link || "",
    //   };
    // }
  
    if (
      values.first_choice_team === "Marketing" ||
      values.second_choice_team === "Marketing"
    ) {
      teamResponses.marketing = {
        choice_num: values.first_choice_team === "Marketing" ? 1 : 2,
        marketing_skills: values.marketing_skills || "",
        marketing_example_instagram_post:
          values.marketing_example_instagram_post || "",
      };
    }
  
    if (
      values.first_choice_team === "Outreach" ||
      values.second_choice_team === "Outreach"
    ) {
      teamResponses.outreach = {
        choice_num: values.first_choice_team === "Outreach" ? 1 : 2,
        outreach_skills: values.outreach_skills || "",
        outreach_experience: values.outreach_experience || "",
      };
    }
  
    if (
      values.first_choice_team === "Podcast" ||
      values.second_choice_team === "Podcast"
    ) {
      teamResponses.podcast = {
        choice_num: values.first_choice_team === "Podcast" ? 1 : 2,
        podcast_skills: values.podcast_skills || "",
        podcast_example: values.podcast_example || "",

        lead_applicant: values.podcast_role === "lead"
      };
    }
  
    if (
      values.first_choice_team === "Secretary" ||
      values.second_choice_team === "Secretary"
    ) {
      teamResponses.secretary = {
        choice_num: values.first_choice_team === "Secretary" ? 1 : 2,
        secretary_skills: values.secretary_skills || "",
        secretary_idea: values.secretary_idea || "",
        secretary_team_conflict: values.secretary_team_conflict || "",
      };
    }
  
    // Modified Events section
    if (
      values.first_choice_team === "Events" ||
      values.second_choice_team === "Events"
    ) {
      teamResponses.events = {
        choice_num: values.first_choice_team === "Events" ? 1 : 2,
        events_skills: values.events_skills || "",
        events_past_experience: values.events_past_experience || "",

        lead_applicant: values.events_role === "lead"
      };
    }
  
    // Modified Finance section
    if (
      values.first_choice_team === "Finance" ||
      values.second_choice_team === "Finance"
    ) {
      teamResponses.finance = {
        choice_num: values.first_choice_team === "Finance" ? 1 : 2,
        finance_project: values.finance_project || "",
        finance_time_management: values.finance_time_management || "",

        lead_applicant: values.finance_role === "lead"
      };
    }
  
    // Attach team responses JSON to the submission data
    submission.team_responses = teamResponses;
    setSubmissionObject(submission);
  
    try {
      await submitApplication(submission);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Team choice logic
  const { control, watch } = form;
  const selectedTeams = watch(["first_choice_team", "second_choice_team"]);

  // Carousel config //////////////////////////////////////////////////////////////
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]); // Removed selectedTeams from dependencies

  const slides = [
    { id: "intro", component: <Intro control={control} /> },
    ...(selectedTeams.includes("Events")
      ? [{ id: "events", component: <Events control={control} /> }]
      : []),
    ...(selectedTeams.includes("Secretary")
      ? [{ id: "secretary", component: <Secretary control={control} /> }]
      : []),
    ...(selectedTeams.includes("Marketing")
      ? [{ id: "marketing", component: <Marketing control={control} /> }]
      : []),
    ...(selectedTeams.includes("Outreach")
      ? [{ id: "outreach", component: <Outreach control={control} /> }]
      : []),
    ...(selectedTeams.includes("Podcast")
      ? [{ id: "podcast", component: <Podcast control={control} /> }]
      : []),
    ...(selectedTeams.includes("Engineering")
      ? [{ id: "engineering", component: <Engineering control={control} /> }]
      : []),
    ...(selectedTeams.includes("Finance")
      ? [{ id: "finance", component: <Finance control={control} /> }]
      : []),
  ];

  //////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative select-none space-y-2 transition-opacity"
        >
          <div className="relative mx-auto w-full">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((slide, index) => (
                  <div className="flex-[0_0_100%]" key={slide.id}>
                    <Card className="relative m-1 h-[80vh] rounded-xl">
                      <CardContent className="absolute inset-0 overflow-y-auto p-6">
                        {slide.component}
                      </CardContent>
                      <div className="absolute right-8 top-8 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 shadow-lg">
                        Step <strong>{index + 1}</strong>{" "}
                        <span className="text-zinc-500">
                          of {slides.length}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        {index > 0 && (
                          <Button
                            onClick={scrollPrev}
                            variant="outline"
                            type="button"
                          >
                            Previous
                          </Button>
                        )}
                      </div>
                      <div className="absolute bottom-4 right-4">
                        {index < slides.length - 1 && (
                          <Button
                            onClick={scrollNext}
                            variant="outline"
                            type="button"
                          >
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
          <Button
            type="submit"
            className="absolute right-4"
            disabled={submitting}
          >
            Submit
          </Button>
        </form>
      </Form>

      {submitting && !submitError && <Spinner size="small" />}

      <SubmissionDialog
        submitted={submitted}
        submitError={submitError}
        setSubmitted={setSubmitted}
        setSubmitError={setSubmitError}
        values={submissionObject}
      />
    </>
  );
}
