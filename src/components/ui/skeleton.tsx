import type { HTMLAttributes } from "react"

import { cn } from "@/styles/utils"

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface-active", className)}
      {...props}
    />
  )
}

export { Skeleton }
