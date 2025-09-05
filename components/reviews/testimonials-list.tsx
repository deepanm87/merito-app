import { Form, Testimonial } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import ApproveRejectButtons from "@/components/reviews/approve-reject-buttons"
import { TestimonialStatus } from "@/@types"
import StarRating from "@/components/common/star-rating"

export default function TestimonialsList({
  formId,
  testimonials
}: {
  formId: Form["id"]
  testimonials: Testimonial[]
}) {

  const testimonialsEle = testimonials.map( ({ id, name, role, testimonial, rating, status, createdAt, updatedAt }) => {
    return <Card key={id} className="space-y-1 gap-4">
      <CardHeader>
        <div className="flex justify-between flex-row items-start space-y-2">
          <div className="space-y-1">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
          <div>
            { status === TestimonialStatus.PENDING
              ? ( <ApproveRejectButtons 
                    formId={formId} 
                    testimonialId={id}
                  />)
              : (
                <Badge 
                  className={cn(
                    "capitalize rounded-full text-sm px-3 py-1",
                    status === "approved" 
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                  )}>
                {status}
                </Badge>
              )  
            }
            </div>
          </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <StarRating rating={rating} />
        </div>
        <p>{testimonial}</p>
      </CardContent>
      <CardFooter className="text-gray-500 text-sm">
        {
          new Date(updatedAt).toLocaleDateString("en-US", {
            year: 'numeric',
            month: "long",
            day: "numeric"
      })}
      </CardFooter>
    </Card>
  })

  return (
    <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4">
      {testimonialsEle}
    </div>
  )
}