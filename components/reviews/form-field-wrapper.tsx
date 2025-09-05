import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { FeedbackFormValues } from "./form/feedback-form-schema"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormFieldWrapperProps {
  label: string
  placeholder?: string
  name: keyof FeedbackFormValues
  control: ReturnType<typeof useForm<FeedbackFormValues>>["control"]
  component?: "input" | "textarea"
  children?: React.ReactNode
}

export default function FormFieldWrapper({ label, name, placeholder, control, component, children }: FormFieldWrapperProps) {
  return (
    <FormField 
      control={control} 
      name={name}
      render={ ({ field }) => (
        <FormItem className="flex flex-col items-center gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            { component === "input" ? (
              <Input placeholder={placeholder} {...field} />
            ) : component === "textarea" ? (
              <Textarea 
                placeholder={placeholder} 
                {...field} 
                className="min-h-[120px]"
              />
            ) : ( children )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}