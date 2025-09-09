import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReviewFormById } from "@/lib/reviews";
import { Form } from "@prisma/client";
import { CheckIcon, DogIcon, HeartIcon, SparkleIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ formId: Form["id"] }>;
}) {
  const { formId } = await params;

  const formResult = await getReviewFormById({ formId });
  const form = formResult.success ? (formResult.data as Form) : null;

  if (!form) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm animate-in p-8">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center shadow-lg">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              Thank you! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {form.thankYouMessage}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse "></div>
                <span>Response submitted successfully</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse flex items-center justify-center">
          <HeartIcon className="w-8 h-8 text-orange-400" />
        </div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse flex items-center justify-center">
          <DogIcon className="w-8 h-8 text-orange-400" />
        </div>
        <div className="absolute top-1/2 left-5 w-8 h-8 bg-orange-200 rounded-full opacity-30 animate-bounce flex items-center justify-center">
          <SparkleIcon className="w-6 h-6 text-orange-400" />
        </div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-1000 flex items-center justify-center">
          <SparkleIcon className="w-6 h-6 text-yellow-400" />
        </div>
      </div>
    </div>
  );
}
