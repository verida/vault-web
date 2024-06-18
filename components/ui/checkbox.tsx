import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

import { Check } from "../icons/check";

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label: React.ReactNode;
};

const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => {
  const { className, color, label, ...checkboxProps } = props;

  return (
    <label className={cn("flex items-center gap-2", className)}>
      <span className='flex-1'>{label}</span>
      <CheckboxPrimitive.Root
        data-accent-color={color}
        {...checkboxProps}
        ref={forwardedRef}
        className={cn("w-5 h-5 border-2 rounded-sm flex items-center justify-center checkbox-root")}
      >
        <CheckboxPrimitive.Indicator asChild className='flex items-center justify-center'>
          <Check className='w-3 h-3 text-white' />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </label>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
