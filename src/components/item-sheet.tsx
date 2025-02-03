import { CloseSideRight } from "@/components/icons/close-side-right"
import { Typography } from "@/components/typography"
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
import { cn } from "@/styles/utils"

export const ItemSheet = Sheet

export const ItemSheetTrigger = SheetTrigger

export const ItemSheetClose = SheetClose

export type ItemSheetContentProps = React.ComponentProps<typeof SheetContent>

export function ItemSheetContent(props: ItemSheetContentProps) {
  const {
    hideOverlay = false,
    side = "right",
    className,
    ...sheetContentProps
  } = props

  return (
    <SheetContent
      hideOverlay={hideOverlay}
      side={side}
      className={cn(
        "flex w-screen flex-col sm:bottom-2 sm:right-2 sm:top-2 sm:h-[calc(100dvh_-_1rem)] sm:max-w-[520px] sm:rounded-md sm:shadow-lg",
        className
      )}
      {...sheetContentProps}
    />
  )
}
ItemSheetContent.displayName = "ItemSheetContent"

export interface ItemSheetHeaderProps
  extends React.ComponentProps<typeof SheetHeader> {
  right?: React.ReactNode
  hideCloseButton?: boolean
}

export function ItemSheetHeader(props: ItemSheetHeaderProps) {
  const { children, right, hideCloseButton, className, ...sheetHeaderProps } =
    props

  return (
    <SheetHeader
      {...sheetHeaderProps}
      className={cn("flex flex-col gap-4 border-b px-6 py-4", className)}
    >
      <div
        className={cn(
          "flex flex-row items-center justify-between gap-3",
          hideCloseButton && !right ? "hidden sm:block" : ""
        )}
      >
        <div className="flex min-w-0 flex-1 flex-row items-center gap-3">
          {!hideCloseButton && (
            // FIXME: For some reasons the tooltip is display when opening the sheet
            // <Tooltip>
            //   <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="-ml-2 shrink-0"
              asChild
            >
              <SheetClose>
                <CloseSideRight />
                <span className="sr-only">Close</span>
              </SheetClose>
            </Button>
            //   </TooltipTrigger>
            //   <TooltipContent>Close</TooltipContent>
            // </Tooltip>
          )}
          <div className="hidden flex-1 truncate sm:block">{children}</div>
        </div>
        {right ? (
          <div className="flex flex-row items-center gap-3">{right}</div>
        ) : null}
      </div>
      <div className="sm:hidden">{children}</div>
    </SheetHeader>
  )
}
ItemSheetHeader.displayName = "ItemSheetHeader"

export interface ItemSheetTitleProps
  extends Omit<React.ComponentProps<typeof Typography>, "variant"> {
  /** Used for accessibility reason, not displayed in the UI */
  description?: string
}

export function ItemSheetTitle(props: ItemSheetTitleProps) {
  const { description = "Item sheet", className, ...typographyProps } = props

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
ItemSheetTitle.displayName = "ItemSheetTitle"

export type ItemSheetBodyProps = React.ComponentProps<typeof SheetBody>

export function ItemSheetBody(props: ItemSheetBodyProps) {
  const { className, ...sheetBodyProps } = props
  return (
    <SheetBody
      className={cn("flex-1 overflow-y-auto overflow-x-hidden p-6", className)}
      {...sheetBodyProps}
    />
  )
}
ItemSheetBody.displayName = "ItemSheetBody"

export type ItemSheetFooterProps = React.ComponentProps<typeof SheetFooter>

export function ItemSheetFooter(props: ItemSheetFooterProps) {
  const { className, ...sheetFooterProps } = props
  return (
    <SheetFooter
      className={cn("border-t p-6", className)}
      {...sheetFooterProps}
    />
  )
}
ItemSheetFooter.displayName = "ItemSheetFooter"
