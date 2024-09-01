import { Filter } from "@/components/icons/filter"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

export type FilterButtonProps = Omit<
  React.ComponentPropsWithRef<typeof Button>,
  "variant" | "size"
> & { applied?: boolean }

export function FilterButton(props: FilterButtonProps) {
  const { className, applied = false } = props

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn(
        "h-10 w-10 p-0 text-muted-foreground hover:border-border-hover hover:bg-surface md:h-12 md:w-auto md:p-[10px] md:px-4",
        applied ? "border-accent" : "",
        className
      )}
      {...props}
    >
      <Filter />
      <Typography variant="base-semibold" className="hidden md:block">
        Filter
      </Typography>
    </Button>
  )
}
