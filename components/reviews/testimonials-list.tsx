import StarRating from "@/components/common/star-rating";
import ApproveRejectButtons from "@/components/reviews/approve-reject-buttons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TestimonialStatus } from "@/types";
import { Form, Testimonial } from "@prisma/client";

export default function TestimonialsList({
  formId,
  testimonials,
}: {
  formId: Form["id"];
  testimonials: Testimonial[];
}) {
  return (
    <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4">
      {testimonials.map(
        ({ id, name, role, testimonial, rating, status, updatedAt }) => {
          return (
            <Card key={id} className="space-y-1 gap-4">
              <CardHeader>
                <div className="flex justify-between flex-row items-start">
                  <div className="space-y-1">
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{role}</CardDescription>
                  </div>
                  <div>
                    {status === TestimonialStatus.PENDING ? (
                      <ApproveRejectButtons
                        formId={formId}
                        testimonialId={id}
                      />
                    ) : (
                      <Badge
                        className={cn(
                          "capitalize rounded-full text-sm px-3 py-1",
                          status === TestimonialStatus.APPROVED
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        )}
                      >
                        {status}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <StarRating rating={rating} />
                <p>{testimonial}</p>
              </CardContent>
              <CardFooter className="text-gray-500 text-sm">
                {new Date(updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardFooter>
            </Card>
          );
        }
      )}
    </div>
  );
}
