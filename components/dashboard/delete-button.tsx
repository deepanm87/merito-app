"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteFormAction } from "@/actions/form-actions"
import { Form } from "@prisma/client"
import { toast } from "sonner"
import { useTransition } from "react"

export default function DeleteButton({ formId }: { formId: Form["id"] }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    startTransition(async () => {
      const { success, error } = await deleteFormAction({ formId })

      if (success) {
        toast.success("✨ Deleted!", {
          description: "🗑️ Your form has been deleted successfully",
          icon: null,
        })
      } else {
        toast.error("❌ Failed to delete form", {
          description: error,
          icon: null,
        })
      }
    })
  }

  return (
    <form>
      <Button variant={"outline"} onClick={handleDelete} disabled={isPending}>
        <Trash2Icon />
      </Button>
    </form>
  )
}
