import EmbedSection from "@/components/reviews/embed-section";
import TestimonialsList from "@/components/reviews/testimonials-list";
import { Button } from "@/components/ui/button";
import { getReviewFormById, getTestimonialsByFormId } from "@/lib/reviews";
import { Form } from "@prisma/client";
import { EyeIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ formId: Form["id"] }>;

export default async function ReviewsPage({ params }: { params: Params }) {
  const { formId } = await params;

  const formResult = await getReviewFormById({ formId });
  const form = formResult.success ? (formResult.data as Form) : null;

  const testimonialsResult = await getTestimonialsByFormId({ formId });
  const testimonials = testimonialsResult.success
    ? testimonialsResult.data
    : [];

  if (!form) {
    return notFound();
  }

  return (
    <div className="wrapper">
      <div className="mb-8">
        <div className="flex justify-between items-center my-8">
          <div>
            <h2>{form.name}</h2>
            <p className="text-gray-500 capitalize">{form.formType} Widget</p>
          </div>

          <div className="flex gap-2">
             <Button asChild>
                <Link href={`/responses/${formId}`}>View Responses</Link>
              </Button> 
            <Button variant="outline" className="border-amber-400" asChild>
              <Link href={`/f/${formId}`} target="_blank">
                <EyeIcon className="w-4 h-4" />
                Preview
              </Link>
            </Button>
          </div>
        </div>

        <EmbedSection formId={formId} />

        <div className="flex items-center gap-2 justify-center my-8 mt-16 lg:mt-24">
          <HeartIcon className="w-6 h-6 text-red-500 fill-red-500" />
          <h2>Wall of Love</h2>
        </div>

        <TestimonialsList formId={formId} testimonials={testimonials} />
      </div>
    </div>
  );
}
