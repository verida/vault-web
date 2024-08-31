import { Filter } from "@/components/icons/filter"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

export type FilterButtonProps = Omit<
  React.ComponentPropsWithRef<typeof Button>,
  "variant" | "size"
> & { applied?: boolean }

export const FilterButton: React.FC<FilterButtonProps> = (props) => {
  const { className, applied = false } = props
  return (
    <Button
      variant="secondary"
      size="lg"
      className={cn(
        "h-10 w-10 p-0 text-secondary-foreground hover:border-secondary-foreground/40 hover:bg-primary md:h-12 md:w-auto md:p-[10px] md:px-4",
        applied ? "border-primary text-primary" : "",
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
