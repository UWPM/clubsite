import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

// dropdown depencencies
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { handleWordCount } from "../formSchema"
import { useState, useEffect } from "react"

type Program = {
  value: string
  formalName: string
}


export function Intro({ control }: { control: any }) {
    return (
      <div className="space-y-5">

        <div className="">
          <h3>Prodcon 2025 Application Form</h3>
        </div>

        <FormField
          control={control}
          name="app_type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Team or Individual Sign up?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="team" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Team
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="individual" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Individual
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
    )
}
