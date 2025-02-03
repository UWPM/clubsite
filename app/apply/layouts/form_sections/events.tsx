import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { teamOptions, secondTeamOptions, handleWordCount } from "../formSchema"

export function Events({ control }: { control: any }) {
    return (
        <>
            <h3>Events</h3>

            {/* Textarea with word limit */}
            <FormField
                control={control}
                name="events_skills"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>What relevant experiences and skills make you a good fit for the role?</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder=""
                            className="resize-y"
                            value={field.value} // Bind the field value directly
                            onChange={(e) => handleWordCount(e, field, 200)} // Attach word count handler
                        />
                    </FormControl>
                    <FormDescription>
                        Maximum: 200 words
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />

            {/* Textarea with word limit */}
            <FormField
                control={control}
                name="events_past_experience"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Describe a past experience where you successfully planned and executed a major event.</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder=""
                            className="resize-y"
                            value={field.value} // Bind the field value directly
                            onChange={(e) => handleWordCount(e, field, 200)} // Attach word count handler
                        />
                    </FormControl>
                    <FormDescription>
                        Maximum: 200 words
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}