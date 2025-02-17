import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import { teamOptions, secondTeamOptions, handleWordCount, questionToText } from "../formSchema"

export function Engineering({ control }: { control: any }) {
    return (
        <div className="space-y-5">
            <h3>Engineering</h3>

            {/* Textarea with word limit */}
            <FormField
            control={control}
            name="engineering_skills"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{questionToText["engineering_skills"]}</FormLabel>
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
            name="engineering_technical_challenge"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{questionToText["engineering_technical_challenge"]}</FormLabel>
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

            {/* Textarea */}
            <FormField
                control={control}
                name="engineering_project_link"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{questionToText["engineering_project_link"]}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder=""
                            className="resize-none max-h-10 min-h-10"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}