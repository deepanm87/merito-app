
"use server"

import { prisma } from "@/lib/prisma"
import { TestimonialStatus } from "@/@types"
import { auth } from "@clerk/nextjs/server"
import { Form, Testimonial } from "@prisma/client"
import z from "zod"
import { revalidatePath } from 'next/cache'

const testimonialSchema = z.object({
  formId: z.string().min(1, "Form id is required"),
  testimonialId: z.number().min(1, "Testimonial id is required"),
  status: z.enum([TestimonialStatus.APPROVED, TestimonialStatus.REJECTED, TestimonialStatus.PENDING])
})

export const updateTestimonialStatusAction = async ({ 
  testimonialId, 
  formId, 
  status 
}: {
  testimonialId: Testimonial["id"]
  status: Testimonial["status"]
  formId: Form["id"]
}) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized"
      } 
    }

    const validationResult = testimonialSchema.safeParse({
      formId,
      testimonialId,
      status
    })

    if (!validationResult.success) {
      return {
        success: false,
        error: 
          validationResult.error.issues[0]?.message || 
          "Invalid testimonialId or formId or status"
      }
    }

    const {
      formId: validatedFormID,
      testimonialId: validatedTestimonialId,
      status: validatedStatus
    } = validationResult.data

    const testimonial = await prisma.testimonial.findFirst({
      where: {
        id: validatedTestimonialId,
        form: {
          userId
        }
      }
    })

    if (!testimonial) {
      return {
        success: false,
        error: "Testimonial not found or you do not have permission to update it"
      }
    }

    const result = await.prisma.testimonial.update({
      where: {
        id: validatedTestimonialId
      },
      data: {
        status: validatedStatus
      }
    })

    revalidatePath(`/reviews/${validatedFormId}`)

    return {
      success: true,
      error: ""
    }

  } catch (error) {
    console.error(`Error updating testimonial status ${error}`)
    return { 
      success: false, 
      error: "Failed to update testimonial status"
    }
  }
}