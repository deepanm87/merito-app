"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FeedbackFormValues,
  feedbackSchema,
} from "./form/feedback-form-schema";
import FormFieldWrapper from "./form-field-wrapper";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState, useEffect, useState } from "react";
import StarRatingWrapper from "../common/star-rating";
import { createTestimonialAction } from "@/actions/review-actions";
import { Form as PrismaForm } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AIFeedbackForm({
  formId,
}: {
  formId: PrismaForm["id"];
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [state, formAction, isPending] = useActionState(
    createTestimonialAction,
    {
      success: false,
      error: "",
    }
  );
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      role: "",
      rating: 0,
      testimonial: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      form.reset();
    }
  }, [state.success, form]);

  const handleRatingChange = (_rating: number) => {
    setRating(_rating);
    form.setValue("rating", _rating);
  };

  const onSubmit = (data: FeedbackFormValues) => {
    startTransition(() => {
      formAction({ formId, data });
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-2">
                <FormLabel>How would you rate your experience?</FormLabel>
                <FormControl>
                  <StarRatingWrapper
                    rating={field.value}
                    onRatingChange={handleRatingChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormFieldWrapper
            label="Your Testimonial"
            name="testimonial"
            placeholder="Share your experience here... (We'll help you make it even better!)"
            control={form.control}
            component="textarea"
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit My Testimonial"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
