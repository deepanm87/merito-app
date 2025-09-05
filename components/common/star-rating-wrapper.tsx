import StarRating from "./star-rating"

export default function StarRatingWrapper({
  rating,
  onRatingChange
}: {
  rating: number
  onRatingChange: (rating: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onRatingChange(rating)}>
        <StarRating rating={rating} />
      </button>
    </div>
  )
}