import { Sort } from "./icons/sort";
import { Typography } from "./typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortSelectorProps = Omit<
  React.ComponentPropsWithRef<typeof Select>,
  "variant" | "size"
> & { applied?: boolean };

export const SortSelector: React.FC<SortSelectorProps> = (props) => {
  const { applied = false } = props;
  return (
    <Select {...props} defaultValue="newest">
      <SelectTrigger
        className="h-10 w-10 justify-center gap-2 p-0 text-secondary-foreground md:h-12 md:w-auto md:justify-between md:px-3 md:py-2"
        selectIconClassName="hidden md:block"
      >
        <Sort className="block md:hidden" />
        <Typography variant="base-semibold" className="hidden md:block">
          <SelectValue />
        </Typography>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="most-used">Most used</SelectItem>
        <SelectItem value="least-used">Least used</SelectItem>
        <SelectItem value="name-asc">Item Name: A-Z</SelectItem>
        <SelectItem value="name-desc">Item Name: Z-A</SelectItem>
      </SelectContent>
    </Select>
  );
};
