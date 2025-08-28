import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { getForms } from "@/lib/reviews"
import { BookHeartIcon, EyeIcon } from "lucide-react"
import Link from "next/link"



export default async function DashboardPage() {

    const { success, data: forms } = await getForms()

    if (!success) {
        return <div>Error fetching forms</div>
    }

    const formsElements = forms.map( ({ id, name, responses }) => (
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
                            <Link href={"/"} target="_blank">
                                <EyeIcon className="w-4 h-4" />
                            </Link>
                        </Button>
                        <DeleteButton />
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