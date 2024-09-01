"use client"

import { CloseSideRight } from "@/components/icons/close-side-right"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export type FilterSheetProps = React.PropsWithChildren & {
  open: boolean
  onClose: () => void
  className?: string
}

export function FilterSheet(props: FilterSheetProps) {
  const { open, onClose, children } = props

  return (
    <Drawer direction="right" open={open} onClose={onClose}>
      <DrawerTrigger />
      <DrawerContent
        onClose={onClose}
        className="w-[356px] border-l shadow-sm md:bottom-0 md:right-0 md:h-[calc(100%-72px)] md:rounded-none"
        overlayClassName="bg-transparent"
      >
        {children}
      </DrawerContent>
    </Drawer>
  )
}

export type FilterSheetHeaderProps = {
  title: string
  onClose: () => void
}

export function FilterSheetHeader(props: FilterSheetHeaderProps) {
  const { title, onClose } = props

  return (
    <DrawerHeader className="gap-4 px-6 py-4 text-left">
      <div className="flex w-full items-center justify-between">
        <DrawerTitle>{title}</DrawerTitle>
        <CloseSideRight className="cursor-pointer" onClick={onClose} />
      </div>
    </DrawerHeader>
  )
}

export type FilterSheetBodyProps = React.PropsWithChildren

export function FilterSheetBody(props: FilterSheetBodyProps) {
  const { children } = props

  return <DrawerBody className="p-4">{children}</DrawerBody>
}

export type FilterSheetFooterProps = React.PropsWithChildren

export function FilterSheetFooter(props: FilterSheetFooterProps) {
  const { children } = props

  return <DrawerFooter className="p-4">{children}</DrawerFooter>
}
