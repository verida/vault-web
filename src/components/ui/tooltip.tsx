"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { QuestionMarkIcon } from "@/components/icons/question-mark-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, collisionPadding = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    collisionPadding={collisionPadding}
    className={cn(
      "z-50 overflow-hidden rounded-lg bg-foreground px-4 py-2 text-sm text-surface shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface TooltipIndicatorProps
  extends Pick<ComponentProps<typeof Button>, "className"> {
  content: string
}

function TooltipIndicator(props: TooltipIndicatorProps) {
  const { content, className } = props

  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleTooltipToggle = useCallback(() => {
    setIsTooltipOpen((prevState) => !prevState)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-5 rounded-full p-0", className)}
          onClick={handleTooltipToggle}
        >
          <QuestionMarkIcon className="size-5 shrink-0 text-muted-foreground" />
          <span className="sr-only">Show tooltip</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent ref={tooltipRef}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipIndicator,
  TooltipContent,
  TooltipProvider,
}
