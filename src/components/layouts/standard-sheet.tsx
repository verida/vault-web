import { type ComponentProps } from "react"

import { CloseSideRight } from "@/components/icons/close-side-right"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/styles/utils"

export const StandardSheet = Sheet

export const StandardSheetTrigger = SheetTrigger

export const StandardSheetClose = SheetClose

export interface StandardSheetContentProps
  extends ComponentProps<typeof SheetContent> {}

export function StandardSheetContent(props: StandardSheetContentProps) {
  const {
    hideOverlay = true,
    side = "right",
    className,
    ...sheetContentProps
  } = props

  return (
    <SheetContent
      side={side}
      hideOverlay={hideOverlay}
      className={cn(
        "top-auto flex h-[calc(100dvh_-_73px)] w-screen flex-col sm:max-w-sm",
        className
      )}
      {...sheetContentProps}
    />
  )
}
StandardSheetContent.displayName = "StandardSheetContent"

export interface StandardSheetHeaderProps
  extends ComponentProps<typeof SheetHeader> {
  hideCloseButton?: boolean
}

export function StandardSheetHeader(props: StandardSheetHeaderProps) {
  const { children, hideCloseButton, ...sheetHeaderProps } = props

  return (
    <SheetHeader
      {...sheetHeaderProps}
      className="flex min-w-0 flex-row items-center gap-3 border-b px-6 py-4"
    >
      {!hideCloseButton && (
        // FIXME: For some reasons the tooltip is display when opening the sheet
        // <Tooltip>
        //   <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="-ml-2 shrink-0" asChild>
          <SheetClose>
            <CloseSideRight />
            <span className="sr-only">Close</span>
          </SheetClose>
        </Button>
        //   </TooltipTrigger>
        //   <TooltipContent>Close</TooltipContent>
        // </Tooltip>
      )}
      <div className="truncate">{children}</div>
    </SheetHeader>
  )
}
StandardSheetHeader.displayName = "StandardSheetHeader"

export interface StandardSheetTitleProps
  extends Omit<ComponentProps<typeof Typography>, "variant"> {
  /** Used for accessibility reason, not displayed in the UI */
  description?: string
}

export function StandardSheetTitle(props: StandardSheetTitleProps) {
  const {
    description = "Standard sheet",
    className,
    ...typographyProps
  } = props

  return (
    <>
      <SheetTitle className="truncate">
        <Typography
          variant="heading-4"
          component="span"
          className={cn("truncate", className)}
          {...typographyProps}
        />
      </SheetTitle>
      <SheetDescription className="sr-only">{description}</SheetDescription>
    </>
  )
}
StandardSheetTitle.displayName = "StandardSheetTitle"

export interface StandardSheetBodyProps
  extends ComponentProps<typeof SheetBody> {}

export function StandardSheetBody(props: StandardSheetBodyProps) {
  const { className, ...sheetBodyProps } = props

  return (
    <SheetBody
      className={cn("flex-1 overflow-y-auto overflow-x-hidden p-6", className)}
      {...sheetBodyProps}
    />
  )
}
StandardSheetBody.displayName = "StandardSheetBody"

export interface StandardSheetFooterProps
  extends ComponentProps<typeof SheetFooter> {}

export function StandardSheetFooter(props: StandardSheetFooterProps) {
  const { className, ...sheetFooterProps } = props

  return (
    <SheetFooter
      className={cn("border-t p-6", className)}
      {...sheetFooterProps}
    />
  )
}
StandardSheetFooter.displayName = "StandardSheetFooter"
