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

const outreach_interested_roles = [
  { id: "director", label: "Outreach Director" },
  { id: "lead", label: "Outreach Lead" },
] as const;

export function Outreach({ control }: { control: any }) {
  return (
    <>
      <h3>Outreach</h3>

      <FormField
        control={control}
        name="outreach_interested_roles"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>
                Select the roles for which you are interested.
              </FormLabel>
              {/* <FormDescription>
                    Select the items you want to display in the sidebar.
                    </FormDescription> */}
            </div>
            {outreach_interested_roles.map((item) => (
              <FormField
                key={item.id}
                control={control}
                name="outreach_interested_roles"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item.id,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
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

      {/* Textarea */}
      <FormField
        control={control}
        name="outreach_lead_experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["outreach_lead_experience"]}</FormLabel>
            <FormControl>
              <Textarea placeholder="" className="resize-y" {...field} />
            </FormControl>
            <FormDescription>
              For Outreach Lead applicants only.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
