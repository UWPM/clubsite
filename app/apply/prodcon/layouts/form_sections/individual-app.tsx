import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import {
  handleWordCount,
  questionToText,
} from "../prodconFormSchema";

export function IndividualApplication({ control }: { control: any }) {
  return (
    <div className="space-y-5">
      <h3>Individual Application</h3>

      {/* Details */}
      <FormField
        control={control}
        name="individual_app_name"
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
        name="individual_app_email"
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
        name="individual_app_prog"
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
        name="individual_app_goal"
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
        name="individual_app_pm_interest"
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
