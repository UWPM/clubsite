"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useCallback, useEffect } from "react";

import { prodconFormSchema } from "./prodconFormSchema";
import { FormSubmission } from "./prodconFormSchema";

import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";

// Form Sections
import { Intro } from "./form_sections/intro";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import SubmissionDialog from "./dialog";

import { submitApplication } from "../actions";
import { TeamApplication } from "./form_sections/team-app";
import { IndividualApplication } from "./form_sections/individual-app";

export function ProfileForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submissionObject, setSubmissionObject] =
    useState<FormSubmission | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof prodconFormSchema>>({
    resolver: zodResolver(prodconFormSchema),
    mode: "onChange",
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof prodconFormSchema>) => {
    setSubmitting(true);
    // console.log("Submitting");

    // Data mapping
    const submission: FormSubmission = {
      created_at: new Date().toISOString(),
      app_type: (values.app_type as "team" | "individual") || null,
      raw: values,
      submitter_email:
        values.app_type === "team"
          ? values.team_app_member1_email || null
          : values.individual_app_email || null,
    };

    // If team, build TeamData
    if (values.app_type === "team") {
      const members = [1, 2, 3, 4]
        .map((i) => {
          const name = (values as any)[`team_app_member${i}_name`];
          const email = (values as any)[`team_app_member${i}_email`];
          const program = (values as any)[`team_app_member${i}_prog`];
          // normalize empty strings to null
          return {
            name: name && name !== "" ? name : null,
            email: email && email !== "" ? email : null,
            program: program && program !== "" ? program : null,
          };
        })
        .filter((m) => m.name || m.email || m.program);

      submission.team = {
        members: members as any,
        open_to_grouping: values.team_app_team_less_than_4 === "Yes",
        goal: values.team_app_goal || null,
        pm_interest: values.team_app_pm_interest || null,
      };
    }

    // If individual, build IndividualData
    if (values.app_type === "individual") {
      submission.individual = {
        name: values.individual_app_name || null,
        email: values.individual_app_email || null,
        program: values.individual_app_prog || null,
        goal: values.individual_app_goal || null,
        pm_interest: values.individual_app_pm_interest || null,
      };
    }

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

  // Application type logic
  const { control, watch, formState } = form;
  const appType = watch("app_type") as string;

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
    ...(appType == "team" ? [{ id: "team-app", component: <TeamApplication control={control} /> }] : []),
    ...(appType == "individual" ? [{ id: "individual-app", component: <IndividualApplication control={control} /> }] : []),
  ];

  //////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-2 transition-opacity select-none"
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
                      <div className="absolute top-8 right-8 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 shadow-lg">
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
                      <div className="absolute right-4 bottom-4">
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
            disabled={submitting || !formState.isValid}
            aria-disabled={submitting || !formState.isValid}
          >
            {submitting ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>

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
