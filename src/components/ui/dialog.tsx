"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { Close } from "@/components/icons/close"
import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed bottom-0 left-0 z-50 flex max-h-[90vh] w-full flex-col rounded-t-2xl border bg-surface px-6 py-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:bottom-1/2 sm:left-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:translate-y-1/2 sm:rounded-2xl sm:py-6 sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=open]:slide-in-from-left-1/2",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <header className="flex flex-row items-start justify-between gap-3 pb-4">
    <div
      className={cn("flex flex-1 flex-col gap-2 text-left", className)}
      {...props}
    />
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="-m-1 h-auto w-auto shrink-0 p-1"
    >
      <DialogPrimitive.Close>
        <Close />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </Button>
  </header>
)
DialogHeader.displayName = "DialogHeader"

const DialogBody = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex-1 overflow-y-auto py-4", className)} {...props} />
)
DialogBody.displayName = "DialogBody"

const DialogFooter = ({ className, ...props }: ComponentProps<"footer">) => (
  <footer
    className={cn(
      "flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    // TODO: Use Typography?
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    // TODO: Use Typography?
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
