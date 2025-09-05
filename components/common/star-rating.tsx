"use client"

import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const renderStar = (rating: number, index: number) => {
  return (
    <StarIcon 
      key={index}
      className={cn(
        "w-6 h-6 text-yellow-400",
        index < rating && "fill-yellow-400"
      )}
    />
    )
}

export default function StarRating({ 
  rating, 
  onRatingChange
}: { 
  rating: number
  onRatingChange?: (rating: number) => void 
}) {
  return (
    <div className="flex items-center gap-2">
        { Array(5)
          .fill(0)
          .map( (_, index) => (
            onRatingChange ? (
              <button 
                key={index}
                onClick={e => {
                  e.preventDefault()
                  onRatingChange?.(index + 1)
                }}
                className="flex items-center gap-2"
                >
                {renderStar(rating, index)}
              </button>
            ) : (
              renderStar(rating, index)
            )
            ))
        }
    </div>
  )
}