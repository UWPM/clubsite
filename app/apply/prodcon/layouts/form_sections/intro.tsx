import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Intro({ control }: { control: any }) {
  return (
    <div className="h-full min-h-0">
      <div className="font-semibold">
        <h3>Prodcon 2025 Application Form</h3>
      </div>

      <div className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-1 flex-col gap-y-4 text-sm pt-8">
          <p>
            📣 Interested in product management? Love hearing about new ideas?
          </p>
          <p>
            Applications for Prodcon 2024 are now open! 🎉
          </p>
          <p>
            Come out to ProdCon 2024 on November 16th! This is your chance to
            hear top-notch product managers talk about their experiences and
            work with a team to pitch your product idea for the case study. 💻💰
          </p>
          <p>
            ProdCon will be held in-person this term 🎉! You will need to make
            your own arrangements to get to the University of Waterloo campus!
          </p>
          <p>
            This competition is open to all undergraduate students from any
            Canadian University.
          </p>
          <p>
            Sign up in groups of 2 to 4 or as an individual, and we’ll match you
            to a group! For Group submissions, only one application is needed
            per team.
          </p>
          <p>
            Applications are due on November 1st, at 11:59 PM EST. All
            applications submitted before the deadline will be reviewed by our
            team.
          </p>
          <p>Good luck, and we hope to see you there! 🎉</p>
        </div>

        <FormField
          control={control}
          name="app_type"
          render={({ field }) => (
            <FormItem className="space-y-3 pb-4">
              <FormLabel>Team or Individual Sign up?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <RadioGroupItem value="team" />
                    </FormControl>
                    <FormLabel className="font-normal">Team</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <RadioGroupItem value="individual" />
                    </FormControl>
                    <FormLabel className="font-normal">Individual</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
