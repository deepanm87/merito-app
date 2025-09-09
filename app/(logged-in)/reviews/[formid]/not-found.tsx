import { Button } from "@/components/ui/button";
import { DogIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrapper">
      <div className="flex flex-col items-center justify-center py-12 xl:py-24 space-y-4">
        <DogIcon className="w-24 h-24 text-gray-400" />
        <h1 className="text-3xl font-bold">Form not found</h1>
        <p>The form you&apos;re loooking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
