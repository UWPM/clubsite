import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  handleWordCount,
  questionToText
} from "../formSchema";

export function Outreach({ control }: { control: any }) {
  const available_roles = [
    { id: "director", label: "Outreach Director" },
    { id: "lead", label: "Outreach Lead" },
  ] as const;
  return (
    <div className="space-y-5">
      <h3>Outreach</h3>
      <FormField
        control={control}
        name="outreach_role"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base">Outreach Role</FormLabel>
            <FormDescription>
              Select the outreach role you are interested in.
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
        name="outreach_skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["outreach_skills"]}</FormLabel>
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
        name="outreach_experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["outreach_experience"]}</FormLabel>
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
