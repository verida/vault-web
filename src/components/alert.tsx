import { type VariantProps, cva } from "class-variance-authority"

import { Warning } from "@/components/icons/warning"
import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

// TODO: Rework the Alert component
const alertVariants = cva(
  "rounded border-l-2 bg-primary p-2 text-secondary-foreground",
  {
    variants: {
      variant: {
        info: "border-accent",
        warning: "border-yellow-500",
        error: "border-destructive text-destructive",
      },
    },
    defaultVariants: {
      variant: "warning",
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
        <Typography variant="base-s-semibold">{text}</Typography>
      </div>
    </div>
  )
}
