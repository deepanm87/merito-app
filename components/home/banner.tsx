import { Button } from "@/components/ui/button"
import HighlightText  from "@/components/home/highlight-text"
import { SparklesIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function Banner() {
    return (
        <section className="relative mx-auto flex flex-col items-center justify-center
            py-16 sm:py-20 lg:pb-28 lg:px-12 max-w-7xl z-0 transition-all animate-in">
            <div 
                className="relative p-px overflow-hidden rounded-full bg-linear-to-r 
                from-orange-200 via-orange-400 to-orange-600 animate-gradient-x
                    group mb-6">
                        <span className="relative px-6 py-2 text-base font-medium bg-white
                            rounded-full flex items-center gap-2 group-hover:bg-gray-50
                                transition-colors duration-300">
                                <SparklesIcon 
                                    className="h-6 w-6 text-orange-600 animate-pulse"
                                />
                                <span className="tet-base text-orange-600">Powered by AI</span>
                        </span>
            </div>
            <h1 
                className="font-bold py-6 text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                    Start building <HighlightText text="trust" /> 
                    today
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600 font-normal">
                The easiest way to collect and display testimonials from your happy customers.
            </h2>
            <div className="mt-8">
                <Button size="lg" className="" asChild>
                    <Link 
                        href="/sign-up"
                        className="flex gap-2 items-center justify-center"
                    >
                        <span className="text-base sm:text-lg lg:text-xl">Get Started</span>
                        <ArrowRightIcon className="animate-pulse" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}