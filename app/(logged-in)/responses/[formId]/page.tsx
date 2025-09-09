import TestimonialsList from "@/components/reviews/testimonials-list"
import { Button } from "@/components/ui/button";
import { getReviewFormById, getTestimonialsByFormId } from "@/lib/reviews";
import { Form } from "@prisma/client"
import Link from "next/link"
import { notFound } from "next/navigation"

type Params = Promise<{ formId: Form["id"] }>

export default async function ResponsesPage({ params }: { params: Params }) {

  const { formId } = await params
    const formResult = await getReviewFormById({ formId })
    const form = formResult.success ? (formResult.data as Form) : null
  
    const testimonialsResult = await getTestimonialsByFormId({ formId })
    const testimonials = testimonialsResult.success
      ? testimonialsResult.data
      : []
  
    if (!form) {
      return notFound()
    }


  return (
    <section>
      <div className="flex items-center gap-2 justify-center my-8 mt-16 lg:mt-24">
          <h2>Responses</h2>
        </div>
        <TestimonialsList formId={formId} testimonials={testimonials} />
    </section>
  )
}