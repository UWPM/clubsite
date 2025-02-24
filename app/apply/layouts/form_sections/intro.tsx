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


import { programs } from "../../programs";  // temporary
import { teamOptions, secondTeamOptions, handleWordCount, terms } from "../formSchema"
import { useState, useEffect } from "react"

type Program = {
  value: string
  formalName: string
}

const programList: Program[] = []

programs.forEach(program => {
  if (programList.find((p) => p.value === program.code)) return // Skip if already exists
  programList.push({value: program.code, formalName: program.descriptionFormal})
});


export function Intro({ control }: { control: any }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [currentProgram, setCurrentProgram] = useState("");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (currentProgram) {
      setIsFading(false);
      setTimeout(() => setIsFading(true), 200);
    }
  }, [currentProgram]);
  
    return (
      <div className="space-y-5">

        <div className="">
          <h3>General Info</h3>
        </div>

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UWaterloo Email Address</FormLabel>
              <FormControl>
                <Input placeholder="john1doe@uwaterloo.ca" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <FormField
          control={control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your full name?</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Can update this question to be a dropdown that pulls program list from uWaterloo API */}
        <div className="">
          <FormField
            control={control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">What program are you in?</FormLabel>
                <FormControl>

                <div className="flex flex-row gap-4">
                  {/* Program selection dropdown */}
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        >
                        {value
                          ? programList.find((program) => program.value === value)?.value
                          : "Select program..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search program..." />
                        <CommandList>
                          <CommandEmpty>No program found.</CommandEmpty>
                          <CommandGroup>
                            {programList.map((program) => (
                              <CommandItem
                              key={program.value}
                              value={program.value}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue === field.value ? "" : currentValue); // Update form state
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                              }}
                              onMouseEnter={() => {
                                setCurrentProgram(program.formalName);
                              }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === program.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {program.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <div className={`flex items-center italic text-sm text-zinc-400 transition-opacity duration-200 ${isFading ? 'opacity-100' : 'opacity-0'}`}>{currentProgram}</div>
                </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />          
        </div>
       
        {/* This can also be a dropdown with options 1A, 1B, 2A... */}
        <FormField
          control={control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What term are you in currently in or have most recently completed if on a work term?</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                E.g., 1A, 2B, 3A
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Radio Group */}
        <FormField
          control={control}
          name="term_type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Will you be on a work or study term?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Work Term" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Work Term
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Study Term" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Study Term
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Radio Group */}
        <FormField
          control={control}
          name="on_campus"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Will you be located in Waterloo this term?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Textarea with word limit */}
        <FormField
          control={control}
          name="why_interested"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to join the UWPM team?</FormLabel>
              <FormControl>
                <Textarea
                    placeholder=""
                    className="resize-y"
                    value={field.value} // Bind the field value directly
                    onChange={(e) => handleWordCount(e, field, 100)} // Attach word count handler
                  />
              </FormControl>
              <FormDescription>
                Maximum: 100 words
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Modular Radio Group */}
        <FormField
          control={control}
          name="first_choice_team"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Please indicate your first choice team</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {teamOptions.map((option) => (
                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Modular Radio Group */}
        <FormField
          control={control}
          name="second_choice_team"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Please indicate your second choice team</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {secondTeamOptions.map((option) => (
                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="resume_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please provide a viewable link to your resume.</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Google Drive, Dropbox, OneDrive, personal sites, etc all work! 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


      </div>
    )
}