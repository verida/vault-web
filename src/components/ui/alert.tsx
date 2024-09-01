import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { Warning } from "@/components/icons/warning"
import { cn } from "@/styles/utils"

const alertVariants = cva(
  "relative w-full rounded border border-l-4 bg-muted px-3 py-2",
  {
    variants: {
      variant: {
        info: "border-l-status-info",
        warning: "border-l-status-warning",
        error: "border-l-status-error",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      alertVariants({ variant }),
      variant === "warning" ? "pl-9" : "", // TODO: To remove when other icons are added
      className
    )}
    {...props}
  >
    <div className="absolute left-3 top-2.5">
      {variant === "warning" ? <Warning /> : null}
      {/* TODO: Add other variant icons */}
    </div>
    {children}
  </div>
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    // TODO: Use Typography
    ref={ref}
    className={cn("mb-1 font-medium leading-5 tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    // TODO: Use Typography
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
