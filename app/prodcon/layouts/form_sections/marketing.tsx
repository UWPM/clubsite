import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { teamOptions,secondTeamOptions, handleWordCount, questionToText} from "../formSchema";

export function Marketing({ control }: { control: any }) {
  const available_roles = [
    { id: "director", label: "Marketing Director" },
  ] as const;
  return (
    <div className="space-y-5">
      <h3>Marketing</h3>

      <FormField
        control={control}
        name="marketing_role"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base">Marketing Role</FormLabel>
            <FormDescription>
              Select the marketing role you are interested in.
            </FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                {available_roles.map((role) => (
                  <FormItem
                    key={role.id}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={role.id} />
                    </FormControl>
                    <FormLabel className="font-normal">{role.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Textarea with word limit */}
      <FormField
        control={control}
        name="marketing_skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["marketing_skills"]}</FormLabel>
            <FormControl>
              <Textarea
                placeholder=""
                className="resize-y"
                value={field.value} // Bind the field value directly
                onChange={(e) => handleWordCount(e, field, 200)} // Attach word count handler
              />
            </FormControl>
            <FormDescription>Maximum: 200 words</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Instagram post context */}
      <FormItem>
        <FormLabel>Example Scenario</FormLabel>
        <div style={{ fontSize: "0.8rem" }}>
          UW PM will be holding a speaker panel for those looking to learn more
          about product management and how industry professionals&apos;
          day-to-day are like. There will be 4 different product manager
          panelists who will be discussing:
          <br />
          <br />
          <div>
            <ul style={{ listStyleType: "disc", marginLeft: "2rem" }}>
              <li>What their day-to-day is like</li>
              <li>Important skills as a PM</li>
              <li>How they landed a PM role</li>
              <li>Live Q&A</li>
            </ul>
          </div>
          <br />
          The speaker panel will be held on Zoom on the day June 18th at 7PM -
          8PM EST. The attendees must sign up using the link (signupform.com)
          with the deadline being June 17th at 11:59PM EST. We&apos;re excited
          to see what you come up with!
        </div>
        <FormMessage />
      </FormItem>

      {/* Textarea with word limit */}
      <FormField
        control={control}
        name="marketing_example_instagram_post"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {questionToText["marketing_example_instagram_post"]}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder=""
                className="resize-y"
                value={field.value} // Bind the field value directly
                onChange={(e) => handleWordCount(e, field, 150)} // Attach word count handler
              />
            </FormControl>
            <FormDescription>Maximum: 150 words</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
