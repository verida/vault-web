import { cn } from "@/lib/utils";

import { Filter } from "./icons/filter";
import { Typography } from "./typography";
import { Button } from "./ui/button";

export type FilterButtonProps = Omit<
  React.ComponentPropsWithRef<typeof Button>,
  "variant" | "size"
> & { applied?: boolean };

export const FilterButton: React.FC<FilterButtonProps> = (props) => {
  const { className, applied = false } = props;
  return (
    <Button
      variant="secondary"
      size="lg"
      className={cn(
        "h-10 p-[10px] text-gray-500 hover:border-gray-500/40 hover:bg-background md:h-12 md:px-4",
        applied ? "border-purple-500 text-purple-500" : "",
        className
      )}
      {...props}
    >
      <Filter />
      <Typography variant="heading-5" className="hidden md:block">
        Filter
      </Typography>
    </Button>
  );
};
