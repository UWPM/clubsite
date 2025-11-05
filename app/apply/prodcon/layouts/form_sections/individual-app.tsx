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
  handleWordCount,
  questionToText,
} from "../formSchema";

export function IndividualApplication({ control }: { control: any }) {
  const available_roles = [
    { id: "director", label: "Engineering Director" },
  ] as const;
  return (
    <div className="space-y-5">
      <h3>Individual Application</h3>

      {/* Details */}
      <FormField
        control={control}
        name="engineering_project_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["individual_app_name"]}</FormLabel>
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

      <FormField
        control={control}
        name="engineering_project_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["individual_app_email"]}</FormLabel>
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

      <FormField
        control={control}
        name="engineering_project_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["individual_app_prog"]}</FormLabel>
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

      <FormField
        control={control}
        name="engineering_skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["individual_app_goal"]}</FormLabel>
            <FormControl>
              <Textarea
                placeholder=""
                className="resize-y"
                value={field.value} // Bind the field value directly
                onChange={(e) => handleWordCount(e, field, 1000)} // Attach word count handler
              />
            </FormControl>
            <FormDescription>Maximum: 1000 characters</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="engineering_skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["individual_app_pm_interest"]}</FormLabel>
            <FormControl>
              <Textarea
                placeholder=""
                className="resize-y"
                value={field.value} // Bind the field value directly
                onChange={(e) => handleWordCount(e, field, 1000)} // Attach word count handler
              />
            </FormControl>
            <FormDescription>Maximum: 1000 characters</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
