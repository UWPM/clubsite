"use client"

import { Events } from "./events"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

const teamOptions = ["Secretary", "Events", "Marketing", "Podcast", "Engineering", "Finance", "Outreach"]
const secondTeamOptions = [...teamOptions, "I am not interested in any other team"]

const formSchema = z.object({
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

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Add default values here.
      email: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  // Handle word count cap for the textarea
  const handleWordCount = (e: React.ChangeEvent<HTMLTextAreaElement>, field: any) => {
    const text = e.target.value;
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // If word count exceeds 100, stop further input
    if (wordCount < 100) {
      field.onChange(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Section 1: Intro */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UWaterloo Email Address</FormLabel>
              <FormControl>
                <Input placeholder="john1doe@uwaterloo.ca" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your full name?</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Can update this question to be a dropdown that pulls program list from uWaterloo API */}
        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What program are you in?</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                E.g., SYDE, GBDA, ARBUS
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* This can also be a dropdown with options 1A, 1B, 2A... */}
        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What term are you in currently in or have most recently completed if on a work term?</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                E.g., 1A, 2B, 3A
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Radio Group */}
        <FormField
          control={form.control}
          name="term_type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Will you be on a work or study term?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Work Term" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Work Term
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Study Term" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Study Term
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Radio Group */}
        <FormField
          control={form.control}
          name="on_campus"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Will you be located in Waterloo this term?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Textarea with word limit */}
        <FormField
          control={form.control}
          name="why_interested"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to join the UWPM team?</FormLabel>
              <FormControl>
                <Textarea
                    placeholder=""
                    className="resize-y"
                    value={field.value} // Bind the field value directly
                    onChange={(e) => handleWordCount(e, field)} // Attach word count handler
                  />
              </FormControl>
              <FormDescription>
                Maximum: 100 words
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Modular Radio Group */}
        <FormField
          control={form.control}
          name="first_choice_team"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Please indicate your first choice team</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {teamOptions.map((option) => (
                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Modular Radio Group */}
        <FormField
          control={form.control}
          name="second_choice_team"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Please indicate your second choice team</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {secondTeamOptions.map((option) => (
                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please provide a viewable link to your resume.</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Google Drive, Dropbox, OneDrive, personal sites, etc all work! 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Section 2: Events */}
        <Events />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
