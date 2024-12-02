import { ShieldCheckIcon } from "lucide-react"
import React from "react"

import { Typography } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/styles/utils"

export type SecurityIconProps = React.ComponentProps<typeof ShieldCheckIcon>

export function SecurityIcon(props: SecurityIconProps) {
  const { className, ...iconProps } = props

  return (
    <ShieldCheckIcon
      className={cn(
        "size-4 shrink-0 text-status-secured-foreground",
        className
      )}
      {...iconProps}
    />
  )
}

export type SecuredBadgeProps = Omit<
  React.ComponentProps<typeof Badge>,
  "children" | "variant"
>

export function SecurityBadge(props: SecuredBadgeProps) {
  const { className, ...divProps } = props

  return (
    <Badge
      className={cn(
        "gap-1 border-status-secured-foreground/50 bg-status-secured/50 px-1 py-1 text-status-secured-foreground hover:bg-status-secured/50 sm:px-2 sm:py-1",
        className
      )}
      {...divProps}
    >
      <SecurityIcon className="size-4" />
      <span className="hidden sm:block">Secured</span>
    </Badge>
  )
}
SecurityBadge.displayName = "SecurityBadge"

export const SecurityDetailsPopover = Popover

export type SecurityDetailsPopoverContentProps = React.ComponentProps<
  typeof PopoverContent
>

export function SecurityDetailsPopoverContent(
  props: SecurityDetailsPopoverContentProps
) {
  const {
    className,
    align = "start",
    alignOffset = -20,
    collisionPadding = 8,
    ...popoverContentProps
  } = props

  return (
    <PopoverContent
      className={cn("w-[calc(100vw-1rem)] max-w-sm p-0", className)}
      align={align}
      alignOffset={alignOffset}
      collisionPadding={collisionPadding}
      {...popoverContentProps}
    />
  )
}
SecurityDetailsPopoverContent.displayName = "SecurityDetailsPopoverContent"

export const SecurityDetailsPopoverHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"header">
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn("flex flex-col gap-1 p-6", className)}
    {...props}
  />
))
SecurityDetailsPopoverHeader.displayName = "SecurityDetailsPopoverHeader"

export const SecurityDetailsPopoverTitle = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof Typography>
>(({ className, ...props }, ref) => (
  <div className={cn("min-w-0 text-status-secured-foreground", className)}>
    <Typography ref={ref} variant="heading-4" className="truncate" {...props} />
  </div>
))
SecurityDetailsPopoverTitle.displayName = "SecurityDetailsPopoverTitle"

export const SecurityDetailsPopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof Typography>
>(({ className, ...props }, ref) => (
  <div className={cn("text-muted-foreground", className)}>
    <Typography ref={ref} variant="base-regular" {...props} />
  </div>
))
SecurityDetailsPopoverDescription.displayName =
  "SecurityDetailsPopoverDescription"

export const SecurityDetailsPopoverBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col p-6 pt-0", className)}
    {...props}
  />
))
SecurityDetailsPopoverBody.displayName = "SecurityDetailsPopoverBody"

export const SecurityDetailsPopoverFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"footer">
>(({ className, ...props }, ref) => (
  <footer
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
SecurityDetailsPopoverFooter.displayName = "SecurityDetailsPopoverFooter"

export type SecurityDetailsPopoverTriggerProps = Pick<
  React.ComponentProps<typeof Button>,
  "className"
>

export function SecurityDetailsPopoverTrigger(
  props: SecurityDetailsPopoverTriggerProps
) {
  const { className } = props

  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "h-auto w-fit gap-1 rounded-full border border-status-secured-foreground/50 bg-status-secured/50 px-1 py-1 text-xs font-semibold text-status-secured-foreground hover:border-status-secured-foreground hover:bg-status-secured focus-visible:ring-status-secured-foreground focus-visible:ring-offset-2 sm:px-2 sm:py-1",
          className
        )}
      >
        <SecurityIcon className="size-4" />
        <span className="hidden sm:block">Secured</span>
        <span className="sr-only">Open security details</span>
      </Button>
    </PopoverTrigger>
  )
}
SecurityDetailsPopoverTrigger.displayName = "SecurityDetailsPopoverTrigger"
