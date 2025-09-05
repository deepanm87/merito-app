"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormField } from "@/components/ui/form"
import { FeedbackFormValues, feedbackSchema } from "./form/feedback-form-schema"
import FormFieldWrapper from "./form-field-wrapper"
import { Button } from "@/components/ui/button"
import StarRatingWrapper from "@/components/common/star-rating"
import { useState, useEffect, useActionState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/router"

export default function AIFeedbackForm({ formId }: { formId: Form["id"] }) {

  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [state, formAction, isPending] = useActionState(
    createTestimonialAction, {
      success: false,
      error: null
    }
  )


  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      role: "",
      rating: 0,
      testimonial: ""
    }
  })

  
  useEffect(() => {
    if (state.success) {
      form.reset()
    }
  }, [state.success, form, router, formId])

  const handleRatingChange = (_rating: number) => {
    setRating(_rating)
    form.setValue("rating", _rating)
  }

  const onSubmit = (data: FeedbackFormValues) => {
    startTransition(() => {
      formAction({ formId, data })
    })
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(formAction)}
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
            { isPending ? "Submitting..." : "Submit My Testimonial" }
          </Button>

        </form>
      </Form>
    </div>
  )
}