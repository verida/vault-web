"use client";

import * as React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChevronDown } from "../icons/chevron-down";

const Select: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>> = (props) => {
  const { children, ...rootProps } = props;
  return <SelectPrimitive.Root {...rootProps}>{children}</SelectPrimitive.Root>;
};
Select.displayName = "Select.Root";

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger asChild>
      <button
        {...props}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-between w-full px-3 pr-1 py-2 text-sm font-medium text-gray-700 bg-white border border-border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none relative",
          className
        )}
      >
        <span className='min-w-10 text-left'>
          <SelectPrimitive.Value>{children}</SelectPrimitive.Value>
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className='ml-1 h-6 w-6 text-gray-400' />
        </SelectPrimitive.Icon>
      </button>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = "Select.Trigger";

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        sideOffset={sideOffset}
        asChild={false}
        ref={ref}
        className={cn(
          "z-50 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className='p-2'>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = "Select.Content";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>((props, forwardedRef) => {
  const { className, children, ...itemProps } = props;
  return (
    <SelectPrimitive.Item
      {...itemProps}
      asChild={false}
      ref={forwardedRef}
      className={cn(
        "relative px-4 pl-8 py-2 cursor-pointer select-none text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 focus:outline-none",
        className
      )}
    >
      <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
        <Check className='h-4 w-4 text-indigo-600' />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "Select.Item";

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.Group {...props} asChild={false} ref={forwardedRef} className={cn("", className)} />
));
SelectGroup.displayName = "Select.Group";

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.Label
    {...props}
    asChild={false}
    ref={forwardedRef}
    className={cn("px-4 py-2 text-sm font-medium text-gray-900", className)}
  />
));
SelectLabel.displayName = "Select.Label";

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.Separator
    {...props}
    asChild={false}
    ref={forwardedRef}
    className={cn("h-px bg-gray-200", className)}
  />
));
SelectSeparator.displayName = "Select.Separator";

export { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectSeparator };
