import AIFeedbackForm from "@/components/reviews/ai-feedback-form";
import { getReviewFormById } from "@/lib/reviews";
import { Form } from "@prisma/client";
import { notFound } from "next/navigation";

type Params = Promise<{ formId: Form["id"] }>;

export default async function FormPage({ params }: { params: Params }) {
  const { formId } = await params;

  const formResult = await getReviewFormById({ formId });
  const form = formResult.success ? (formResult.data as Form) : null;

  if (!form) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-md mx-auto text-center space-y-4">
        <div className="card-glass space-y-6">
          <h1 className="text-3xl font-semibold text-center capitalize">
            {form.name}
          </h1>
          <p className="text-gray-600 text-center text-lg">
            {form.description}
          </p>

          <AIFeedbackForm formId={formId} />
        </div>
      </div>
    </div>
  );
}
