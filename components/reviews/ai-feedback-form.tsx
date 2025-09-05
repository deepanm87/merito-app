"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormField } from "@/components/ui/form"
import { FeedbackFormValues, feedbackSchema } from "./form/feedback-form-schema"
import FormFieldWrapper from "./form-field-wrapper"
import { Button } from "@/components/ui/button"
import StarRatingWrapper from "@/components/common/star-rating"
import { useState } from "react"

export default function AIFeedbackForm() {

  const [rating, setRating] = useState(0)


  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      role: "",
      rating: 0,
      testimonial: ""
    }
  })

  const onSubmit = (data: FeedbackFormValues) => {
    console.log(data)
  }

  const handleRatingChange = (_rating: number) => {
    setRating(_rating)
    form.setValue("rating", _rating)
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-center"
        >
          <FormFieldWrapper 
            label="What's your name?"
            name="name"
            placeholder="Share your name with us"
            control={form.control}
            component="input"
          />

          <FormFieldWrapper 
            label="What do you do?"
            name="role"
            placeholder="Your role or company name"
            control={form.control}
            component="input"
          />

          <FormField
            name="rating"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-2">
                <FormLabel>How would you rate your experience?</FormLabel>
                <FormControl>
                  <StarRatingWrapper 
                    rating={field.value} 
                    onRatingChange={handleRatingChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormFieldWrapper 
            label="Your testimonial"
            name="testimonial"
            placeholder="Share your testimonial with us"
            control={form.control}
            component="textarea"
          />

          <Button type="submit" className="w-full">
            Submit My Testimonial
          </Button>

        </form>
      </Form>
    </div>
  )
}