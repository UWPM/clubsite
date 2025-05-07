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

import { handleWordCount, questionToText } from "../formSchema";

export function Finance({ control }: { control: any }) {
  const available_roles = [
    { id: "director", label: "Finance Director" },
    { id: "lead", label: "Finance Lead" },
  ] as const;

  return (
    <div className="space-y-5">
      <h3>Finance</h3>
      <FormField
        control={control}
        name="finance_role"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base">Finance Role</FormLabel>
            <FormDescription>
              Select the finance role you are interested in.
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
        name="finance_project"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["finance_project"]}</FormLabel>
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
        name="finance_time_management"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["finance_time_management"]}</FormLabel>
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
