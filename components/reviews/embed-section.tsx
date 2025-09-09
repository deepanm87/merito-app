import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/reviews/copy-button";

const getEmbedCode = ({ formId }: { formId: Form["id"] }) => `<iframe
  src="${process.env.NEXT_PUBLIC_APP_URL}/reviews/${formId}/embed"
  width="100%"
  height="600px"
  frameborder="0"
  title="Testimonials"
></iframe>
`;

export default function EmbedSection({ formId }: { formId: Form["id"] }) {
  const embedCode = getEmbedCode({ formId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Testimonials</CardTitle>
        <CardDescription className="text-gray-600">
          Copy and paste this code into your website where you want the
          testimonials to appear.
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-gray-100 p-4 rounded-md mx-6">
        <pre className="text-sm overflow-x-auto">{embedCode}</pre>
      </CardContent>
      <CardFooter className="flex gap-2">
        <CopyButton embedCode={embedCode} />
        <Button
          asChild
          variant="outline"
          className="border-amber-400 text-gray-900 hover:border-amber-800"
        >
          <Link href={`/reviews/${formId}/embed`}>Preview Embed</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
