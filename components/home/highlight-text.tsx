export default function HighlightText({
    text
}: {
    text: string
}) {
    return (
        <span className="relative inline-block mx-2">
            <span className="relative z-10 px-2">
                { text }
            </span>
            <span 
                className="absolute inset-0 bg-orange-200/50 -rotate-2 rounded-lg transform -skew-y-1" 
                aria-hidden="true"
            />
        </span>
    )
}