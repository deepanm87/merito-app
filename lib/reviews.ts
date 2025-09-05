import "server-only"

import { prisma } from "@/lib/prisma"
import { Form } from "@prisma/client"
import { TestimonialStatus } from "@/@types"

export async function getReviewFormById({ formId }: { formId: Form["id"]}) {
    try {
        const result = await prisma.form.findUnique({
            where: {
                id: formId
            },
            select: {
                id: true,
                name: true,
                description: true,
                thankYouMessage: true,
                formType: true
            }
        })

        if (!result) {
            return {
                success: false,
                data: [],
                error: "Form not found"
            }
        }

        return {
            success: true,
            data: result
        }
    } catch (error) {
        console.error(`Error fetching the form by formId: ${formId} ${error}`)
        return {
            success: false,
            data: [],
            error,
        }
    }
}

export async function getForms() {
    try {
        const forms = await prisma.form.findMany({
            select: {
                id: true,
                name: true,
                formType: true,
                _count: {
                    select: {
                        testimonials: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            success: true,
            data: forms.map(({ id, name, formType, _count }) => ({
                id,
                name,
                responses: _count.testimonials,
                formType
            }))
        }
    } catch(error) {
        console.error(`Error fetching all the forms ${error}`)
        return {
            success: false,
            data: []
        }
    }
}

export async function getTestimonialsByFormId({ formId }: { formId: Form["id"] }) {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: {
                formId
            },
            orderBy: [
                {
                    status: "asc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })

        return {
            success: true,
            data: testimonials
        }
    } catch(error) {
        console.error(`Error fetching all the testimonials ${error}`)
        return {
            success: false,
            data: [],
            error: "Failed to fetch testimonials"
        }
    }
}

export async function getApprovedTestimonalsByFormId({
    formId
}: {
    formId: Form["id"]
}) {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: {
                formId,
                status: TestimonialStatus.APPROVED
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            success: true,
            data: testimonials
        }
    } catch(error) {
        console.error(`Error fetching all the testimonials ${error}`)
        return {
            success: false,
            data: [],
            error: "Failed to fetch testimonials"
        }
    }
}