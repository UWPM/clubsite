import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { teamOptions, secondTeamOptions, handleWordCount } from "../formSchema"

export function Marketing({ control }: { control: any }) {
    return (
        <>
            <h3>Marketing</h3>

            {/* Textarea with word limit */}
            <FormField
                control={control}
                name="marketing_skills"
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

            {/* Instagram post context */}
            <FormItem>
            <FormLabel>Example Scenario</FormLabel>
            <div style={{ fontSize: "0.8rem" }}>
              UW PM will be holding a speaker panel for those looking to learn more about product management and how industry professionals&apos; day-to-day are like. There will be 4 different product manager panelists who will be discussing: 
              <br /><br />
              
              <div>
                <ul style={{ listStyleType: "disc", marginLeft: "2rem" }}>
                  <li>What their day-to-day is like</li>
                  <li>Important skills as a PM</li>
                  <li>How they landed a PM role</li>
                  <li>Live Q&A</li>
                </ul>
              </div>
              
              <br />

              The speaker panel will be held on Zoom on the day June 18th at 7PM - 8PM EST. The attendees must sign up using the link (signupform.com) with the deadline being June 17th at 11:59PM EST.

              We're excited to see what you come up with!
            </div>
            <FormMessage />
            </FormItem>

            {/* Textarea with word limit */}
            <FormField
                control={control}
                name="marketing_example_instagram_post"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>As part of the Marketing Team, you must be able to write social media posts and emails. Write an example Instagram post for the scenario above.</FormLabel>
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