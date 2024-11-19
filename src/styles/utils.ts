import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { BREAKPOINTS } from "@/styles/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMediaQuery(breakpoint: keyof typeof BREAKPOINTS) {
  return `(min-width: ${BREAKPOINTS[breakpoint]}px)`
}
