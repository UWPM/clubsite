import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import { teamOptions, secondTeamOptions, handleWordCount } from "../formSchema"

export function Engineering({ control }: { control: any }) {
    return (
        <>
            <h3>Engineering</h3>

            {/* Textarea with word limit */}
            <FormField
            control={control}
            name="engineering_skills"
            render={({ field }) => (
                <FormItem>
                <FormLabel>What relevant experiences and skills make you a good fit for the role(s)?</FormLabel>
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
                <FormLabel>Briefly discuss one technical challenge that you faced during a project. How did you go about overcoming it?</FormLabel>
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

            <FormField
            control={control}
            name="engineering_project_link"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Please provide us a link (Devpost, Github, anything) to a project that you are proud of!</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </>
    )
}