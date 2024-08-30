import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Warning } from "./icons/warning"
import { Typography } from "./typography"

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

type AlertProps = {
  text: string
} & VariantProps<typeof alertVariants> &
  React.ComponentProps<"div">

const Alert: React.FC<AlertProps> = (props) => {
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

export default Alert
