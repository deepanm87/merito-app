import { Form, Testimonial } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import ApproveRejectButtons from "@/components/reviews/approve-reject-buttons"
import { TestimonialStatus } from "@/@types"

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
          { Array(5)
            .fill(0)
            .map( (_,index) => (
              <StarIcon 
                key={index}
                className={cn(
                  "w-6 h-6 text-yellow-400",
                  index < rating && "fill-yellow-400"
                )}
              />
            ))
        }
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