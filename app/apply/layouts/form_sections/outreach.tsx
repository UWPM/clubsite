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
  questionToText
} from "../formSchema";

export function Outreach({ control }: { control: any }) {
  return (
    <div className="space-y-5">
      <h3>Outreach</h3>
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
