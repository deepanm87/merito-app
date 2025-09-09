import StarRating from "@/components/common/star-rating";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getApprovedTestimonialsByFormId } from "@/lib/reviews";
import { Form } from "@prisma/client";
import { HeartIcon } from "lucide-react";

type Params = Promise<{ formId: Form["id"] }>;

export default async function EmbedPage({ params }: { params: Params }) {
  const { formId } = await params;

  const testimonialsResult = await getApprovedTestimonialsByFormId({ formId });
  const testimonials = testimonialsResult.success
    ? testimonialsResult.data
    : [];

  return (
    <div className="">
      <div className="flex items-center gap-2 justify-center mb-8">
        <HeartIcon className="w-6 h-6 text-red-500 fill-red-500" />
        <h2>Wall of Love</h2>
      </div>
      <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4">
        {testimonials.map(({ id, name, role, testimonial, rating }) => {
          return (
            <Card key={id} className="space-y-1 gap-4">
              <CardHeader>
                <StarRating rating={rating} />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 ">{testimonial}</p>
              </CardContent>
              <CardFooter className="text-sm">
                <div className="flex justify-between flex-row items-start">
                  <div className="space-y-1">
                    <CardTitle>{name}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {role}
                    </CardDescription>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
