import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { handleCharCount, handleWordCount, questionToText } from "../prodconFormSchema";

export function TeamApplication({ control }: { control: any }) {
  return (
    <div className="space-y-5 font-semibold">
      <h3>ProdCon 2025 - Team Application</h3>
      <div className="flex flex-col gap-8 mb-12">
        <div className="flex flex-col gap-4 border-b pb-8">
          {/* Teammate 1 Details */}
          <FormField
            control={control}
            name="team_app_member1_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {questionToText["team_app_member1_name"]}{" "}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="max-h-10 min-h-10 resize-none"
                    {...field}
                    aria-required={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="team_app_member1_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {questionToText["team_app_member1_email"]}{" "}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="max-h-10 min-h-10 resize-none"
                    {...field}
                    aria-required={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="team_app_member1_prog"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{questionToText["team_app_member1_prog"]}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    itemType="e"
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
            name="team_app_member2_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {questionToText["team_app_member2_name"]}{" "}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="max-h-10 min-h-10 resize-none"
                    {...field}
                    aria-required={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="team_app_member2_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {questionToText["team_app_member2_email"]}{" "}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="max-h-10 min-h-10 resize-none"
                    {...field}
                    aria-required={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="team_app_member2_prog"
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
            name="team_app_member3_name"
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
            name="team_app_member3_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {questionToText["team_app_member3_email"]}
                </FormLabel>
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
            name="team_app_member3_prog"
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
            name="team_app_member4_name"
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
            name="team_app_member4_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {questionToText["team_app_member4_email"]}
                </FormLabel>
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
            name="team_app_member4_prog"
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
        </div>

        <FormField
          control={control}
          name="team_app_team_less_than_4"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                {questionToText["team_app_team_less_than_4"]}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <RadioGroupItem value="No" />
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
          name="team_app_goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{questionToText["team_app_goal"]}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="resize-y"
                  value={field.value} // Bind the field value directly
                  onChange={(e) => handleCharCount(e, field, 1000)} // Attach word count handler
                />
              </FormControl>
              <FormDescription>Maximum: 1000 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="team_app_pm_interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{questionToText["team_app_pm_interest"]}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="resize-y"
                  value={field.value} // Bind the field value directly
                  onChange={(e) => handleCharCount(e, field, 1000)} // Attach word count handler
                />
              </FormControl>
              <FormDescription>Maximum: 1000 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
