"use client"

import * as React from "react"

import { Close } from "@/components/icons/close"
import { cn } from "@/styles/utils"

const Modal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean
    onClose: () => void
  }
>(({ className, isOpen, onClose, ...props }, ref) => {
  if (!isOpen) return null

  return (
    <div className="z-[100]">
      <div className="fixed inset-0 bg-overlay" onClick={onClose}></div>
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center px-4">
        <div
          ref={ref}
          className={cn(
            "pointer-events-auto w-full max-w-[432px] rounded-lg bg-surface p-6 text-foreground shadow-sm",
            className
          )}
        >
          <Close onClick={onClose} className="ml-auto cursor-pointer" />
          <div className="flex flex-col" {...props} />
        </div>
      </div>
    </div>
  )
})

Modal.displayName = "Modal"

export { Modal }
