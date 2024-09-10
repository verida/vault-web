import { cn } from "@/styles/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface-active", className)}
      {...props}
    />
  )
}

export { Skeleton }
