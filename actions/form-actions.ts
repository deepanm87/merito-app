"use server"

import { prisma } from "@/lib/prisma"
import { Form } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { nanoid } from "nanoid"
import { ensureUserInDB } from "@/lib/ensure-user"

export const createFormAction = async (
  prevState: { success: boolean; error: string; data: Form | null },
  formData: FormData
) => {
  try {
    const dbUser = await ensureUserInDB()

    if (!dbUser) {
      throw new Error("Unauthorized")
    }

    const name = formData.get("name") as Form["name"]
    const description = formData.get("description") as Form["description"]
    const thankYouMessage = formData.get(
      "thankYouMessage"
    ) as Form["thankYouMessage"]

    const form = await prisma.form.create({
      data: {
        id: nanoid(5),
        userId: dbUser.id,
        name,
        description,
        thankYouMessage,
        formType: "testimonial",
      },
    })

    revalidatePath("/dashboard");

    return { success: true, error: "", data: form }
  } catch (error) {
    console.error("Error creating forms", error)
    return { success: false, error: "Failed to create form", data: null }
  }
}

const deleteFormSchema = z.object({
  formId: z.string().min(1, "Form id is required"),
})

export const deleteFormAction = async ({ formId }: { formId: Form["id"] }) => {
  try {
    const dbUser = await ensureUserInDB()

    if (!dbUser) {
      throw new Error("Unauthorized")
    }

    const validationResult = deleteFormSchema.safeParse({
      formId,
    })

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0]?.message || "Invalid form id",
      }
    }

    const { formId: validatedFormId } = validationResult.data;

    const result = await prisma.form.deleteMany({
      where: {
        id: validatedFormId,
        userId: dbUser.id,
      },
    })

    if (result.count === 0) {
      return {
        success: false,
        error: "Form not found or you do have permission to delete it",
      }
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      error: "",
    }
  } catch (error) {
    console.error("Error delete the form:", error)
    return { success: false, error: "Failed to delete form" }
  }
}
