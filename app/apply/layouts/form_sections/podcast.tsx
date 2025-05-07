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

import { teamOptions,secondTeamOptions, handleWordCount, questionToText} from "../formSchema";

export function Podcast({ control }: { control: any }) {
  return (
    <div className="space-y-5">
      <h3>Podcast</h3>

      {/* Textarea with word limit */}
      <FormField
        control={control}
        name="podcast_skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["podcast_skills"]}</FormLabel>
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
        name="podcast_example"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["podcast_example"]}</FormLabel>
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
