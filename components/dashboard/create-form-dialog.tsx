"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFormAction } from "@/actions/form-actions";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Form name is required"),
  description: z.string().min(10, "Description is required"),
  thankYouMessage: z.string().min(2, "Thank you message is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateFormDialog() {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(createFormAction, {
    success: false,
    error: "",
    data: null,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      thankYouMessage: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      form.reset();
      toast.success(" Wohoo! Form created", {
        description: "Your form has been created successfully",
        icon: "🎉",
      });
    }
  }, [state.success, setOpen, form]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("thankYouMessage", data.thankYouMessage);

    //invoke server action
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Testimonial / Feedback form</DialogTitle>
          <DialogDescription>
            Create a new form to collect feedback from your users.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. Product Feedback" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe this form" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thankYouMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thank You Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Message to show after submission"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Form"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
