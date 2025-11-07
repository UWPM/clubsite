import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

export function Intro({ control }: { control: any }) {
  return (
    <div className="h-full min-h-0">
      <div className="mb-4">
        <div className="rounded-lg overflow-hidden border border-sky-100 shadow-sm">
          <div className="relative w-full h-36 sm:h-48 xl:h-72">
            <Image
              src="/images/prodcon-banner.webp"
              alt="ProdCon banner"
              fill
              unoptimized
              className="object-center"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </div>
        </div>
      </div>
      <div className="font-semibold text-xl">
        <h3>Prodcon 2025 Application Form</h3>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-1 flex-col gap-y-4 text-sm mb-8 mt-4 border rounded-xl py-4 px-4 font-medium bg-green-50">
          <p>
            📣 Interested in product management? Love hearing about new ideas?
          </p>
          <p>
            Applications for Prodcon 2025 are now open! 🎉
          </p>
          <p>
            Come out to ProdCon 2025 on November 22nd! This is your chance to hear top-notch product managers talk about their experiences and work with a team to pitch your product idea for the case study. 💻💰
          </p>
          <p>
            ProdCon will be held in-person this term 🎉! You will need to make your own arrangements to get to the University of Waterloo campus!
          </p>
          <p>
            This competition is open to all undergraduate students from any Canadian University.
          </p>
          <p>
            Sign up in groups of 2 to 4 or as an individual, and we’ll match you to a group! For Group submissions, only one application is needed per team.
          </p>
          <p>
            Applications are due on November 13th, at 11:59 PM EST. All applications submitted before the deadline will be reviewed by our team.
          </p>
          <p>Good luck, and we hope to see you there! 🎉</p>
        </div>

        <FormField
          control={control}
          name="app_type"
          render={({ field }) => (
              <FormItem className="space-y-3 pb-4">
              <FormLabel>
                Team or Individual Sign up? <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                  aria-required={true}
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

              <p className="text-sm text-zinc-600 mt-2">
                Teams can be up to 4 individuals — please submit one application per team.
              </p>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
