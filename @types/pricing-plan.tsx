export interface PricingPlan {
    id: string
    name: string
    price: number
    priceId: string
    features: string[]
    buttonText: string
    description: string
    isPopular: boolean
}