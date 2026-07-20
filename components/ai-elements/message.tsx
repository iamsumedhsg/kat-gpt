"use client";

import * as React from "react";

import {
  Message as BaseMessage,
  MessageContent as BaseMessageContent,
} from "@/components/ui/message";
import { cn } from "@/lib/utils";

type MessageFrom = "user" | "assistant" | "system";

type MessageProps = React.ComponentProps<typeof BaseMessage> & {
  from?: MessageFrom;
};

function Message({
  className,
  from,
  align,
  ...props
}: MessageProps) {
  const nextAlign = align ?? (from === "user" ? "end" : "start");

  return <BaseMessage className={className} align={nextAlign} {...props} />;
}

function MessageContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseMessageContent>) {
  return <BaseMessageContent className={className} {...props} />;
}

function MessageResponse({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-response"
      className={cn("whitespace-pre-wrap text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

export { Message, MessageContent, MessageResponse };