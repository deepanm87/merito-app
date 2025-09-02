import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form } from "@prisma/client"
import { CodeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const getEmbedCode = ({ formId }: { formId: Form["id"] }) => `
  <iframe
    src="https://${process.env.NEXT_PUBLIC_APP_URL}/reviews/${formId}/embed"
    width="100%"
    height="600px"
    frameborder="0"
    title="Testimonials"
  >
  </iframe>
`

export default function EmbedSection({ formId }: { formId: Form["id"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Testimonials</CardTitle>
        <CardDescription>
          Copy and paste this code into your website where you want the testimonials to appear.
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-gray-100 p-4 rounded-md mx-6">
        <pre className="text-sm overflow-x-auto">{getEmbedCode({ formId })}</pre>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="border-blue-200">
          <CodeIcon className="w-4 h-4"/>
          <span>Copy Code</span>
        </Button>
        <Button 
          asChild 
          variant="outline"
          className="border-amber-400 text-gray-900 hover:border-amber-800"
        >
          <Link href={`/reviews/${formId}/embed`}>Preview Embed</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}