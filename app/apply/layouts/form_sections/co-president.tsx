import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { handleWordCount, questionToText } from "../formSchema";

export function Copresident({ control }: { control: any }) {
  return (
    <div className="space-y-5">
      <h3>Co-President</h3>

      <FormField
        control={control}
        name="copres_vision"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["copres_vision"]}</FormLabel>
            <FormControl>
              <Textarea
                placeholder=""
                className="resize-y"
                value={field.value}
                onChange={(e) => handleWordCount(e, field, 200)}
              />
            </FormControl>
            <FormDescription>Maximum: 200 words</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="copres_challenge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["copres_challenge"]}</FormLabel>
            <FormControl>
              <Textarea
                placeholder=""
                className="resize-y"
                value={field.value}
                onChange={(e) => handleWordCount(e, field, 200)}
              />
            </FormControl>
            <FormDescription>Maximum: 200 words</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="copres_decision"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["copres_decision"]}</FormLabel>
            <FormControl>
              <Textarea
                placeholder=""
                className="resize-y"
                value={field.value}
                onChange={(e) => handleWordCount(e, field, 200)}
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
