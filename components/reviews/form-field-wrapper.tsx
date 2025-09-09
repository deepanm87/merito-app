import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FeedbackFormValues } from "./form/feedback-form-schema";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface FormFieldWrapperProps {
  label: string;
  placeholder: string;
  name: keyof FeedbackFormValues;
  control: ReturnType<typeof useForm<FeedbackFormValues>>["control"];
  component: "input" | "textarea";
}

export default function FormFieldWrapper({
  label,
  name,
  placeholder,
  control,
  component,
}: FormFieldWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-center gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {component === "input" ? (
              <Input placeholder={placeholder} {...field} />
            ) : (
              <Textarea
                placeholder={placeholder}
                {...field}
                className="min-h-[120px]"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
