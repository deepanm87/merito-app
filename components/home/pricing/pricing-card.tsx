import { PricingPlan } from "@/@types/pricing-plan"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

export default function PricingCard({
    id,
    name,
    price,
    features,
    buttonText,
    description,
    isPopular
}: PricingPlan) {
    return (
        <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
            <div 
                className={cn("card-pricing", isPopular && "border-orange-500 gap-5 border-2 shadow-lg scale-105 bg-orange-50/30")}
            >
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <p className="text-lg lg:text-xl font-bold capitalize text-gray-900">{name}</p>
                        <p className="mt-2">{description}</p>
                    </div>
                </div>

                <div className="flex gap-2 items-end">
                    <p className="text-5xl tracking-tight font-extrabold text-gray-900">${price}</p>
                    <div className="flex flex-col justify-end mb-[4px]">
                        <p className="text-xs uppercase font-semibold text-gray-700">USD</p>
                        <p className="text-xs text-gray-600">/month</p>
                    </div>
                </div>
                <div className="pricing-features-list">
                    <ul>
                        { features.map ( (feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <CheckIcon className="text-green-600" />
                                <span className="text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-2 flex justify-center w-full">
                    <Button 
                        className="w-full mt-auto" 
                        variant={isPopular ? "default" : "outline"}
                    >
                        {buttonText}
                    </Button>
                    { isPopular && <span className="badge-popular">Popular</span>}
                </div>
            </div>
        </div>
    )
}