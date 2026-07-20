"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Conversation({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="conversation"
      className={cn("relative flex min-h-0 flex-1 flex-col", className)}
      {...props}
    />
  );
}

function ConversationContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="conversation-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4",
        className
      )}
      {...props}
    />
  );
}

function ConversationScrollButton({
  className,
  children = "Scroll to bottom",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={cn("absolute bottom-4 left-1/2 -translate-x-1/2", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export { Conversation, ConversationContent, ConversationScrollButton };