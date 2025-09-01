import { Form, Testimonial } from "@prisma/client"

export default function TestimonialsList({
  formId,
  testimonials
}: {
  formId: Form["id"]
  testimonials: Testimonial[]
}) {
  return (
    <div>
      TestimonialsList
    </div>
  )
}