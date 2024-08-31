"use client"

import React from "react"

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
import { cn } from "@/styles/utils"

export type ModalSheetProps = React.PropsWithChildren & {
  open: boolean
  onClose: () => void
}

export function ModalSheet(props: ModalSheetProps) {
  const { open, onClose, children } = props

  return (
    <Drawer direction="right" open={open} onClose={onClose}>
      <DrawerTrigger />
      <DrawerContent onClose={onClose}>{children}</DrawerContent>
    </Drawer>
  )
}

export type ModalSheetHeaderProps = {
  title: string | React.ReactNode
  actions: React.ReactNode
  onClose: () => void
}

export function ModalSheetHeader(props: ModalSheetHeaderProps) {
  const { title, actions, onClose } = props

  return (
    <DrawerHeader className="gap-4 px-6 py-4 text-left">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
          <CloseSideRight className="cursor-pointer" onClick={onClose} />
          <DrawerTitle className="hidden md:block">{title}</DrawerTitle>
        </div>
        {actions}
      </div>
      <DrawerTitle className="block md:hidden">{title}</DrawerTitle>
    </DrawerHeader>
  )
}

export type ModalSheetBodyProps = React.PropsWithChildren & {
  className?: string
}

export function ModalSheetBody(props: ModalSheetBodyProps) {
  const { className, children } = props

  return (
    <DrawerBody className={cn("flex-grow p-6", className)}>
      {children}
    </DrawerBody>
  )
}

export type ModalSheetFooterProps = React.PropsWithChildren

export function ModalSheetFooter(props: ModalSheetFooterProps) {
  return <DrawerFooter className="p-6">{props.children}</DrawerFooter>
}
