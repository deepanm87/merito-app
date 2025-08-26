import { pricingPlans } from "@/data/prices"
import PricingCard from "@/components/home/pricing/pricing-card"

export default function PricingTables() {

    const pricesElements = pricingPlans.map(plan => (
        <PricingCard key={plan.id} {...plan} />
    ))
    return (
        <div className="relative overflow-hidden">
            <div className="section-container lg:pt-12">
                <div className="pricing-container">
                    {pricesElements}
                </div>
            </div>
        </div>
    )
}