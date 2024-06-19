"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const SubmitButton = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={cn("", className)}>
      {pending ? (
        <div className="size-4 border-4 border-zinc-200 dark:border-r-zinc-900 rounded-full animate-spin"></div>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
