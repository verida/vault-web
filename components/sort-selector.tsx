import { cn } from "@/lib/utils";

import { Sort } from "./icons/sort";
import { Typography } from "./typography";
import { Button } from "./ui/button";
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
    <Select {...props}>
      <SelectTrigger
        className="h-10 w-10 md:h-12 md:w-28"
        selectIconClassName="hidden md:block"
      >
        <Sort className="block md:hidden" />
        <p className="hidden md:block">
          <SelectValue />
        </p>
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
