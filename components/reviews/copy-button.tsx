"use client";

import { CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function CopyButton({ embedCode }: { embedCode: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(embedCode);
      setIsCopied(true);

      toast.success("✨ Copy Code", {
        description: "📋 The code has been copied to clipboard",
        icon: null,
        position: "top-right",
        style: {
          backgroundColor: "#fff",
        },
      });
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Error copying to clipboard", error);
      toast.error("❌ Failed to Copy text", {
        description: "Please try again",
        icon: null,
        position: "top-right",
        style: {
          backgroundColor: "#fff",
        },
      });
      setIsCopied(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="border-blue-200"
      onClick={handleCopyToClipboard}
    >
      <CodeIcon className="w-4 h-4" />
      <span>{isCopied ? "Copied!" : "Copy Code"}</span>
    </Button>
  );
}
