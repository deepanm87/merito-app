import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

export default function CTA() {
    return (
        <section className="bg-orange-50/60 py-12">
            <div className="section-container">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2"> 
                        <h2>Ready to collect powerful testimonials?</h2>
                        <p 
                            className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed 
                                lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                            >
                                Build trust and boost conversions by showcasing real feedback from your happy customers. Start gathering testimonials in minutes.
                        </p>
                    </div>
                    <div>
                        <Button className="btn-secondary" size="lg" asChild>
                            <Link href="/sign-up">
                                Get Started
                                <ArrowRightIcon className="ml-2 h-4 w-4 animate-pulse" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}