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
import { Checkbox } from "@/components/ui/checkbox";

import {
  teamOptions,
  secondTeamOptions,
  handleWordCount,
  questionToText,
} from "../formSchema";

export function Engineering({ control }: { control: any }) {
  const available_roles = [
    { id: "director", label: "Engineering Director" },
  ] as const;
  return (
    <div className="space-y-5">
      <h3>Engineering</h3>

      <FormField
        control={control}
        name="engineering_role"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base">Engineering Role</FormLabel>
            <FormDescription>
              Select the engineering role you are interested in.
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
                    className="flex items-center space-y-0 space-x-3"
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
        name="engineering_skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["engineering_skills"]}</FormLabel>
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
        name="engineering_technical_challenge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {questionToText["engineering_technical_challenge"]}
            </FormLabel>
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

      {/* Textarea */}
      <FormField
        control={control}
        name="engineering_project_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["engineering_project_link"]}</FormLabel>
            <FormControl>
              <Textarea
                placeholder=""
                className="max-h-10 min-h-10 resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
