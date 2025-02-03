import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { teamOptions, secondTeamOptions, handleWordCount } from "../formSchema"

export function Secretary({ control }: { control: any }) {
    return (
        <>
            <h3>Secretary</h3>

            {/* Textarea with word limit */}
            <FormField
                control={control}
                name="secretary_skills"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>What relevant experiences and skills make you a good fit for the Secretary role?</FormLabel>
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
                name="secretary_idea"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Propose an idea/strategy to improve the representation of our club externally.</FormLabel>
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
                name="secretary_team_conflict"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Describe a time where you handled a team conflict.</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder=""
                            className="resize-y"
                            value={field.value} // Bind the field value directly
                            onChange={(e) => handleWordCount(e, field, 150)} // Attach word count handler
                        />
                    </FormControl>
                    <FormDescription>
                        Maximum: 150 words
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}