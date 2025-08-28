import "server-only"

import { prisma } from "@/lib/prisma"

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