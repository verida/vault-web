import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import { type ComponentProps, forwardRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import type { DataTablePaginationSizeValue } from "@/features/data-table/types"
import { cn } from "@/styles/utils"

const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-2", className)}
      {...props}
    />
  )
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  )
)
PaginationItem.displayName = "PaginationItem"

interface PaginationCurrentProps extends ComponentProps<"div"> {
  pageIndex: number
  pageCount: number
}

const PaginationCurrent = forwardRef<HTMLDivElement, PaginationCurrentProps>(
  ({ pageCount, pageIndex, className, ...divProps }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-10 flex-row items-center gap-1 rounded-md border bg-surface px-4 text-sm font-medium",
        className
      )}
      {...divProps}
    >
      <span className="sr-only">Page</span>
      <span>{pageCount ? pageIndex : EMPTY_VALUE_FALLBACK}</span>
      <span className="text-muted-foreground">{`/ ${pageCount || EMPTY_VALUE_FALLBACK}`}</span>
      <span className="sr-only">total pages</span>
    </div>
  )
)
PaginationCurrent.displayName = "PaginationCurrent"

interface PaginationButtonProps extends ComponentProps<typeof Button> {
  isActive?: boolean
}

const PaginationButton = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationButtonProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    size={size}
    variant={isActive ? "outline" : "ghost"}
    className={cn(className)}
    {...props}
  />
)
PaginationButton.displayName = "PaginationButton"

const PaginationFirst = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to first page"
    className={cn(className)}
    {...props}
  >
    <ChevronFirst className="h-4 w-4" />
    <span className="sr-only">First page</span>
  </PaginationButton>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    className={cn(className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous page</span>
  </PaginationButton>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to next page"
    className={cn(className)}
    {...props}
  >
    <span className="sr-only">Next page</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationButton>
)
PaginationNext.displayName = "PaginationNext"

const PaginationLast = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to last page"
    className={cn(className)}
    {...props}
  >
    <span className="sr-only">Last page</span>
    <ChevronLast className="h-4 w-4" />
  </PaginationButton>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-10 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

interface PaginationSizeProps extends ComponentProps<typeof Select> {
  sizes: DataTablePaginationSizeValue[]
}

const PaginationSize = ({ sizes, ...selectProps }: PaginationSizeProps) => (
  <Select {...selectProps}>
    <SelectTrigger className="min-w-20" aria-label="Pagination size">
      <span className="sr-only">Pagination size</span>
      <SelectValue placeholder="Select" />
    </SelectTrigger>
    <SelectContent side="top">
      {sizes.map((size) => (
        <SelectItem key={size.value} value={size.value.toString()}>
          {size.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
PaginationSize.displayName = "PaginationSize"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationCurrent,
  PaginationButton,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
  PaginationSize,
}
