"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { Form } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const deleteFormSchema = z.object({
  formId: z.string().min(1, "Form id is required")
})

export const deleteFormAction = async ({ formId }: { formId: Form["id"]}) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized"
      }
    }

    const validationResult = deleteFormSchema.safeParse({
      formId
    })

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0]?.message || "Invalid form id"
      }
    }

    const { formId: validatedFormId } = validationResult.data

    const result =  prisma.form.deleteMany({
      where: {
        id: validatedFormId,
        userId
      }
    })

    if (result.count === 0) {
      return {
        success: false,
        error: "Form not found or you do not have permission to delete it"
      }
    }

    revalidatePath("/dashboard")

    return {
      success: true,
      error: ""
    }
  } catch (error) {
    console.error(`Error deleting the form ${error}`)
    return {
      success: false,
      error: "Failed to delete form"
    }
  }
}