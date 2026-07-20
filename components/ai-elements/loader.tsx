"use client";

import * as React from "react";

import { Spinner } from "@/components/ui/spinner";

function Loader({ className, ...props }: React.ComponentProps<typeof Spinner>) {
  return <Spinner className={className} {...props} />;
}

export { Loader };