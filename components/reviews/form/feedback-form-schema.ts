import z from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(4, "Name requires at least 4 characters"),
  role: z.string().min(1, "Role/Company name is required"),
  rating: z.number().min(1).max(5),
  testimonial: z.string().min(10, "Testimonial must be at least 10 characters"),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
