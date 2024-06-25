import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Check } from "../icons/check";

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  label: React.ReactNode;
};

const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(
  (props, forwardedRef) => {
    const { className, color, label, ...checkboxProps } = props;

    return (
      <label className={cn("flex items-center gap-2", className)}>
        <span className="flex-1">{label}</span>
        <CheckboxPrimitive.Root
          data-accent-color={color}
          {...checkboxProps}
          ref={forwardedRef}
          className={cn(
            "checkbox-root flex h-5 w-5 items-center justify-center rounded-sm border-2"
          )}
        >
          <CheckboxPrimitive.Indicator
            asChild
            className="flex items-center justify-center"
          >
            <Check className="h-3 w-3 text-white" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
