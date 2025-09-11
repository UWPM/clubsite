import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Newsletter({ control }: { control: any }) {
  const available_roles = [
    { id: "director", label: "Newsletter Director" },
  ] as const;

  return (
    <div className="space-y-5">
      <h3>Newsletter</h3>
      <FormField
        control={control}
        name="newsletter_role"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base">Newsletter Role</FormLabel>
            <FormDescription>
              Select the newsletter role you are interested in.
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
    </div>
  );
}



