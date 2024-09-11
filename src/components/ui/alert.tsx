import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { AlertErrorIcon } from "@/components/icons/alert-error-icon"
import { AlertInfoIcon } from "@/components/icons/alert-info-icon"
import { AlertSuccessIcon } from "@/components/icons/alert-success-icon"
import { AlertWarningIcon } from "@/components/icons/alert-warning-icon"
import { cn } from "@/styles/utils"

const alertVariants = cva(
  "relative w-full rounded border border-l-4 bg-surface-active px-3 py-2",
  {
    variants: {
      variant: {
        info: "border-l-status-info",
        success: "border-l-status-success",
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
    className={cn(alertVariants({ variant }), "pl-10 text-start", className)}
    {...props}
  >
    <div className="absolute left-3 top-2">
      {variant === "info" ? <AlertInfoIcon className="size-5" /> : null}
      {variant === "success" ? <AlertSuccessIcon className="size-5" /> : null}
      {variant === "warning" ? <AlertWarningIcon className="size-5" /> : null}
      {variant === "error" ? <AlertErrorIcon className="size-5" /> : null}
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
