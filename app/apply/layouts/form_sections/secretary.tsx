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

export function Secretary({ control }: { control: any }) {
  return (
    <div className="space-y-5">
      <h3>Secretary</h3>

      {/* Textarea with word limit */}
      <FormField
        control={control}
        name="secretary_skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["secretary_skills"]}</FormLabel>
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
        name="secretary_idea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["secretary_idea"]}</FormLabel>
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
        name="secretary_team_conflict"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["secretary_team_conflict"]}</FormLabel>
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
