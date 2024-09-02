import { CloseSideRight } from "@/components/icons/close-side-right"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer"
import { cn } from "@/styles/utils"

export type ItemSheetProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function ItemSheet(props: ItemSheetProps) {
  const { open, onClose, children } = props

  return (
    <Drawer direction="right" open={open} onClose={onClose}>
      <DrawerContent
        onClose={onClose}
        className="flex-flex-col bottom-0 right-0 top-0 m-0 h-auto w-screen rounded-none shadow-none sm:bottom-2 sm:right-2 sm:top-2 sm:w-[480px] sm:max-w-full sm:rounded-md sm:shadow-lg"
      >
        {children}
      </DrawerContent>
    </Drawer>
  )
}
ItemSheet.displayName = "ItemSheet"

export type ItemSheetHeaderProps = {
  onClose: () => void
  right?: React.ReactNode
  hideCloseButton?: boolean
} & React.ComponentProps<typeof DrawerHeader>

export function ItemSheetHeader(props: ItemSheetHeaderProps) {
  const { children, onClose, right, hideCloseButton, ...drawerHeaderProps } =
    props

  return (
    <DrawerHeader
      {...drawerHeaderProps}
      className="flex flex-col gap-4 border-b px-6 py-4"
    >
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-row items-center gap-3">
          {!hideCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="-ml-2 shrink-0"
            >
              <CloseSideRight />
            </Button>
          )}
          <div className="hidden truncate sm:block">{children}</div>
        </div>
        {right ? (
          <div className="flex flex-row items-center gap-3">{right}</div>
        ) : null}
      </div>
      <div className="sm:hidden">{children}</div>
    </DrawerHeader>
  )
}
ItemSheetHeader.displayName = "ItemSheetHeader"

export type ItemSheetTitleProps = Omit<
  React.ComponentProps<typeof Typography>,
  "variant"
>

export function ItemSheetTitle(props: ItemSheetTitleProps) {
  const { className, ...typographyProps } = props

  return (
    <Typography
      variant="heading-4"
      className={cn("truncate", className)}
      {...typographyProps}
    />
  )
}
ItemSheetTitle.displayName = "ItemSheetTitle"

export type ItemSheetBodyProps = React.ComponentProps<typeof DrawerBody>

export function ItemSheetBody(props: ItemSheetBodyProps) {
  const { className, ...drawerBodyProps } = props
  return (
    <DrawerBody
      className={cn("flex-1 overflow-y-auto p-6", className)}
      {...drawerBodyProps}
    />
  )
}
ItemSheetBody.displayName = "ItemSheetBody"

export type ItemSheetFooterProps = React.ComponentProps<typeof DrawerFooter>

export function ItemSheetFooter(props: ItemSheetFooterProps) {
  const { className, ...drawerFooterProps } = props
  return (
    <DrawerFooter
      className={cn("border-t p-6", className)}
      {...drawerFooterProps}
    />
  )
}
ItemSheetFooter.displayName = "ItemSheetFooter"
