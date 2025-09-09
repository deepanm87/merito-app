"use server";

import {
  FeedbackFormValues,
  feedbackSchema,
} from "@/components/reviews/form/feedback-form-schema";
import { prisma } from "@/lib/prisma";
import { TestimonialStatus } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Form, Testimonial } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const testimonialSchema = z.object({
  formId: z.string().min(1, "Form id is required"),
  testimonialId: z.number().min(1, "Testimonial id is required"),
  status: z.enum([
    TestimonialStatus.APPROVED,
    TestimonialStatus.REJECTED,
    TestimonialStatus.PENDING,
  ]),
});

export const updateTestimonialStatusAction = async ({
  testimonialId,
  status,
  formId,
}: {
  testimonialId: Testimonial["id"];
  status: Testimonial["status"];
  formId: Form["id"];
}) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    //validate the request
    const validationResult = testimonialSchema.safeParse({
      formId,
      testimonialId,
      status,
    });

    if (!validationResult.success) {
      return {
        success: false,
        error:
          validationResult.error.issues[0]?.message ||
          "Invalid testimonialId or formId or status",
      };
    }

    const {
      formId: validatedFormId,
      testimonialId: validatedTestimonialId,
      status: validatedStatus,
    } = validationResult.data;

    //first verify that user owns the form
    const testimonial = await prisma.testimonial.findFirst({
      where: {
        id: validatedTestimonialId,
        form: {
          userId,
        },
      },
    });

    if (!testimonial) {
      return {
        success: false,
        error:
          "Testimonial not found or you do not have permission to update it",
      };
    }

    //update the testimonial status
    const result = await prisma.testimonial.update({
      where: {
        id: validatedTestimonialId,
      },
      data: {
        status: validatedStatus,
      },
    });

    //clear cache
    revalidatePath(`/reviews/${validatedFormId}`);

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.error("Error updating testimonial status:", error);
    return { success: false, error: "Failed to update testimonial status" };
  }
};

const createTestimonialSchema = z.object({
  formId: z.string().min(1, "Form id is required"),
  data: feedbackSchema,
});

export const createTestimonialAction = async (
  prevState: {
    success: boolean;
    error: string | null;
  },
  {
    formId,
    data,
  }: {
    formId: string;
    data: FeedbackFormValues;
  }
) => {
  try {
    //validate the request
    const validationResult = createTestimonialSchema.safeParse({
      formId,
      data,
    });

    if (!validationResult.success) {
      return {
        success: false,
        error:
          validationResult.error.issues[0]?.message || "Invalid formId or data",
      };
    }

    const { formId: validatedFormId, data: validatedData } =
      validationResult.data;

    const result = await prisma.testimonial.create({
      data: {
        formId: validatedFormId,
        status: TestimonialStatus.PENDING,
        ...validatedData,
      },
    });

    revalidatePath(`/reviews/${validatedFormId}`);
  } catch (error) {
    console.error("Error creating testimonial", error);
    return { success: false, error: "Failed to create testimonial" };
  }

  redirect(`/f/${formId}/thankyou`);
};
