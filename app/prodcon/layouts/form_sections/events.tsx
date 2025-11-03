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

import {
  teamOptions,
  secondTeamOptions,
  handleWordCount,
  questionToText,
} from "../formSchema";

export function Events({ control }: { control: any }) {
  const available_roles = [
    { id: "director", label: "Events Director" },
    { id: "lead", label: "Events Lead" },
  ] as const;

  return (
    <div className="space-y-5">
      <h3>Events</h3>
      <FormField
        control={control}
        name="events_role"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base">Events Role</FormLabel>
            <FormDescription>
              Select the events role you are interested in.
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
        name="events_skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["events_skills"]}</FormLabel>
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

      {/* Textarea with word limit */}
      <FormField
        control={control}
        name="events_past_experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["events_past_experience"]}</FormLabel>
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
    </div>
  );
}
