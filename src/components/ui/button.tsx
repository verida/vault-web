import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/styles/utils"

const buttonVariants = cva(
  "ring-offset-surface inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "primary":
          "hover:border-primary-hover hover:bg-primary-hover border border-primary bg-primary text-primary-foreground focus-visible:ring-ring",
        "outline":
          "hover:border-border-hover bg-surface border text-foreground hover:bg-muted focus-visible:ring-ring",
        "destructive":
          "hover:bg-destructive-hover hover:border-destructive-hover border border-destructive bg-destructive text-destructive-foreground focus-visible:ring-destructive",
        "outline-destructive":
          "hover:border-border-hover bg-surface border text-destructive hover:bg-muted focus-visible:ring-destructive",
        "ghost":
          "bg-transparent text-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
