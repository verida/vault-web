"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "w-10 h-6 rounded-full relative shadow-[inset_0_1px_2px_0_rgba(0,0,0,.12)] bg-[#f7f7f7] data-[state=checked]:bg-[#5ECEA5] transition-all",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

const SwitchThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Thumb> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SwitchPrimitive.Thumb
    ref={ref}
    className={cn(
      "block w-5 h-5 rounded-full bg-white shadow-[0_2px_4px_0_rgba(0,0,0,.25)] translate-x-[2px] transition-all data-[state=checked]:!translate-x-[18px]",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </SwitchPrimitive.Thumb>
));
SwitchThumb.displayName = SwitchPrimitive.Thumb.displayName;

export { Switch, SwitchThumb };
