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

export function TeamApplication({ control }: { control: any }) {
  const available_roles = [
    { id: "director", label: "Engineering Director" },
  ] as const;
  return (
    <div className="space-y-5">
      <h3>Team Application</h3>

      {/* Teammate 1 Details */}
      <FormField
        control={control}
        name="engineering_project_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["team_app_member1_name"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_member1_email"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_member1_prog"]}</FormLabel>
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
      {/* endregion */}

      {/* Teammate 2 Details */}
      <FormField
        control={control}
        name="engineering_project_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["team_app_member2_name"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_member2_email"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_member2_prog"]}</FormLabel>
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

      {/* Teammate 3 Details */}
      <FormField
        control={control}
        name="engineering_project_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["team_app_member3_name"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_member3_email"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_member3_prog"]}</FormLabel>
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

      {/* Teammate 4 Details */}
      <FormField
        control={control}
        name="engineering_project_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{questionToText["team_app_member4_name"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_member4_email"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_member4_prog"]}</FormLabel>
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
        name="term_type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{questionToText["team_app_team_less_than_4"]}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="Work Term" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="Study Term" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
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
            <FormLabel>{questionToText["team_app_goal"]}</FormLabel>
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
            <FormLabel>{questionToText["team_app_pm_interest"]}</FormLabel>
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
