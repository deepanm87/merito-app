"use client"

import { Form, Testimonial } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon } from "lucide-react"
import { updateTestimonialStatusAction } from "@/actions/review-actions"
import { toast } from "sonner"
import { TestimonialStatus } from "@/@types"

export default function ApproveRejectButtons({
  formId,
  testimonialId
}: {
  formId: Form["id"]
  testimonialId: Testimonial["id"]
}) {

  const handleStatusUpdate = async ({ status }: { status:Testimonial["status"] }) => {
    const result = await updateTestimonialStatusAction({ testimonialId, status, formId })

    if (result.success) {
      toast.success("✅ Status updated", {
        description: "Testimonial status updated successfully",
        icon: null
      })
    } else {
      toast.error("❌ Failed to update status", {
        description: result.error || "Failed to update testimonial status",
        icon: null
      }
        )
    }
  }

  return (
    <div className="flex gap-2">
      <Button 
        className="bg-gray-50 border-green-200 text-green-500 hover:bg-green-100"
        onClick={ () => handleStatusUpdate({ status: TestimonialStatus.APPROVED })}
      >
        <CheckIcon className="w-4 h-4" />
      </Button>
      <Button 
        variant="destructive" 
        className="border-red-200 text-red-500 bg-gray-50 hover:bg-red-100 border"
        onClick={() => handleStatusUpdate({ status: TestimonialStatus.REJECTED })}
      >
        <XIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}