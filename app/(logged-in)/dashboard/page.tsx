import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookHeartIcon, EyeIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"

async function getForms() {
    return [
        {
            id: "1",
            name: "Frontend snacks form",
            responses: 10,
            shareUrl: "https://frontendsnacks.com/forms/1"
        },
        {
            id: "2",
            name: "ProofyBubble Feedback Form",
            responses: 3,
            shareUrl: "https://proofybubbles.com/forms/1"
        }
    ]
}

export default async function DashboardPage() {

    const forms = await getForms()

    const formsElements = forms.map( ({ id, name, responses, shareUrl }) => (
        <Link href={`/reviews/${id}`} key={id} className="block">
            <Card 
            key={id}
            className="p-6 border border-amber-200 h-28 hover:bg-gray-50 
                hover:shadow-md hover:scale-105 hover:ease-in-out transition-all duration-200"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="flex-shrink-0">
                            <BookHeartIcon 
                            className="h-5 w-5 object-cover drop-shadow-xs duration-200
                                lg:h-6 delay-100 hover:-rotate-12 text-blue-700"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm lg:text-base break-words">{name}</h3>
                            <p className="text-sm text-gray-500">{responses}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Button variant={"outline"} asChild>
                            <Link href={shareUrl} target="_blank">
                                <EyeIcon className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button variant={"outline"}><Trash2Icon /></Button>
                    </div>
                </div>
            </Card>
        </Link>
    ))

    return (
        <div className="wrapper">
            <div className="flex justify-between items-center mb-8">
                <h2>Your Forms</h2>
                <Button>Create Forms</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {formsElements}
            </div>
        </div>
    )
}