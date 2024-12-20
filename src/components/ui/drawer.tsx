"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

// TODO: When deleting this file, also remove the dependency `vaul`

import { cn } from "@/styles/utils"

/**
 * @deprecated
 */
const Drawer = ({
  shouldScaleBackground = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    dismissible
    shouldScaleBackground={shouldScaleBackground}
    noBodyStyles
    {...props}
  />
)
Drawer.displayName = "Drawer"

/**
 * @deprecated
 */
const DrawerTrigger = DrawerPrimitive.Trigger

/**
 * @deprecated
 */
const DrawerPortal = DrawerPrimitive.Portal

/**
 * @deprecated
 */
const DrawerClose = DrawerPrimitive.Close

/**
 * @deprecated
 */
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-overlay", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

/**
 * @deprecated
 */
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    onClose?: () => void
    overlayClassName?: React.ComponentProps<typeof DrawerOverlay>["className"]
  }
>(({ className, overlayClassName, children, onClose, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay onClick={onClose} className={overlayClassName} />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed bottom-0 right-0 top-0 z-50 flex h-auto w-[480px] flex-col rounded-none bg-surface shadow-none outline-none after:!content-none",
        className
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

/**
 * @deprecated
 */
const DrawerHeader = ({
  className,
  ...props
}: React.ComponentProps<"header">) => (
  <header className={cn(className)} {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

/**
 * @deprecated
 */
const DrawerBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(className)} {...props} />
)
DrawerBody.displayName = "DrawerBody"

/**
 * @deprecated
 */
const DrawerFooter = ({
  className,
  ...props
}: React.ComponentProps<"footer">) => (
  <footer className={cn(className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

/**
 * @deprecated
 */
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  // TODO: Use Typography?
  <DrawerPrimitive.Title ref={ref} className={cn(className)} {...props} />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

/**
 * @deprecated
 */
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  // TODO: Use Typography?
  <DrawerPrimitive.Description ref={ref} className={cn(className)} {...props} />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerDescription,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
}
