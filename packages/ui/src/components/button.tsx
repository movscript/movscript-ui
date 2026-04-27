"use client";

import * as React from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "ms-button",
          `ms-button--${variant}`,
          `ms-button--${size}`,
          loading && "ms-button--loading",
          className
        )}
        disabled={disabled || loading}
        data-loading={loading ? "true" : undefined}
        {...props}
      >
        {loading ? <span className="ms-button__spinner" aria-hidden="true" /> : null}
        <span className="ms-button__content">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

