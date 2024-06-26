import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      "heading-1": "text-heading-1 sm:text-desktop-heading-1",
      "heading-2": "text-heading-2 sm:text-desktop-heading-2",
      "heading-3": "text-heading-3 sm:text-desktop-heading-3",
      "heading-4": "text-heading-4 sm:text-desktop-heading-4",
      "heading-5": "text-heading-5 sm:text-desktop-heading-5",
      "base-regular": "text-base-regular sm:text-desktop-base-regular",
      "base-semibold": "text-base-semibold sm:text-desktop-base-semibold",
      "base-l": "text-base-l sm:text-desktop-base-l",
      "base-s-regular": "text-base-s-regular sm:text-desktop-base-s-regular",
      "base-s-semibold": "text-base-s-semibold sm:text-desktop-base-s-semibold",
    },
    component: {
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      h5: "",
      h6: "",
      p: "",
      span: "",
    },
  },
  defaultVariants: {
    variant: "base-semibold",
    component: "p",
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;

export type TypographyProps = {
  children: React.ReactNode;
} & TypographyVariants &
  Omit<React.ComponentPropsWithRef<"div">, "children">;

const mapping = {
  "heading-1": "h1",
  "heading-2": "h2",
  "heading-3": "h3",
  "heading-4": "h4",
  "heading-5": "h5",
  "base-regular": "p",
  "base-semibold": "p",
  "base-l": "p",
  "base-s-regular": "p",
  "base-s-semibold": "p",
};

export const Typography: React.FunctionComponent<TypographyProps> = (props) => {
  const { variant, component, children, className, ...otherProps } = props;

  const htmlTag = component || mapping[variant || "base-semibold"];

  const classes = `${typographyVariants({ variant })} ${className}`;

  // TODO: Optimise without the switch
  switch (htmlTag) {
    case "h1":
      return (
        <h1 className={classes} {...otherProps}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={classes} {...otherProps}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={classes} {...otherProps}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={classes} {...otherProps}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={classes} {...otherProps}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={classes} {...otherProps}>
          {children}
        </h6>
      );
    case "span":
      return (
        <span className={classes} {...otherProps}>
          {children}
        </span>
      );
    case "p":
    default:
      return (
        <p className={classes} {...otherProps}>
          {children}
        </p>
      );
  }
};
