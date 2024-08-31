import { type VariantProps, cva } from "class-variance-authority"

import { Warning } from "@/components/icons/warning"
import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

const alertVariants = cva(
  "rounded border-l-4 bg-muted px-3 py-2 text-foreground",
  {
    variants: {
      variant: {
        info: "border-status-info",
        warning: "border-status-warning",
        error: "border-status-error",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

export type AlertProps = {
  text: string
} & VariantProps<typeof alertVariants> &
  React.ComponentProps<"div">

export function Alert(props: AlertProps) {
  const { text, variant, className, ...divProps } = props

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...divProps}
    >
      <div className="flex items-center gap-2">
        {variant === "warning" ? <Warning /> : null}
        <Typography variant="base-s-regular" className="line-clamp-2 flex-1">
          {text}
        </Typography>
      </div>
    </div>
  )
}
