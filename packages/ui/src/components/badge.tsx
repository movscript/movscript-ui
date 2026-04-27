"use client";

import * as React from "react";
import { cn } from "../lib/cn";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("ms-badge", `ms-badge--${variant}`, className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

