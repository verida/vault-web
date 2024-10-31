"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as React from "react"

import { QuestionMarkIcon } from "@/components/icons/question-mark-icon"
import { cn } from "@/styles/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipIndicator = React.forwardRef<
  React.ElementRef<typeof TooltipTrigger>,
  React.ComponentPropsWithoutRef<typeof TooltipTrigger>
>(({ className, ...props }, ref) => (
  <TooltipTrigger ref={ref} className={cn(className)} {...props}>
    <QuestionMarkIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
  </TooltipTrigger>
))
TooltipIndicator.displayName = "TooltipIndicator"

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-lg bg-foreground px-4 py-2 text-sm text-surface shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  Tooltip,
  TooltipTrigger,
  TooltipIndicator,
  TooltipContent,
  TooltipProvider,
}
