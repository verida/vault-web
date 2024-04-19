"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Close } from "../icons/close";

const Modal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    onClose: () => void;
  }
>(({ className, isOpen, onClose, ...props }, ref) => {
  if (!isOpen) return null;

  return (
    <div className='z-[100]'>
      <div className='fixed inset-0 bg-black/40' onClick={onClose}></div>
      <div className='fixed inset-0 flex justify-center items-center pointer-events-none px-4'>
        <div
          ref={ref}
          className={cn(
            "rounded-lg bg-card text-card-foreground shadow-sm p-6 w-full max-w-[432px] pointer-events-auto",
            className
          )}
        >
          <Close onClick={onClose} className='ml-auto cursor-pointer' />
          <div className='flex flex-col' {...props} />
        </div>
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

export { Modal };
