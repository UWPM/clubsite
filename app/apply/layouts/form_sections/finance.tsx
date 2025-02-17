import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import { teamOptions, secondTeamOptions, handleWordCount, questionToText } from "../formSchema"

export function Finance({ control }: { control: any }) {
    return (
        <>
            <h3>Finance</h3>

            {/* Textarea with word limit */}
            <FormField
            control={control}
            name="finance_project"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{questionToText["finance_project"]}</FormLabel>
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
            name="finance_time_management"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{questionToText["finance_time_management"]}</FormLabel>
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