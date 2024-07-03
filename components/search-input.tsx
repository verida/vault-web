import { debounce } from "lodash";
import React, { useCallback } from "react";

import { cn } from "@/lib/utils";

import { Search } from "./icons/search";

type SearchInputProps = {
  onValueChange?: React.Dispatch<string>;
} & React.InputHTMLAttributes<HTMLInputElement>;

function SearchInput({ onValueChange, className, ...props }: SearchInputProps) {
  const debounceChangeHandler = useCallback(
    debounce(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        onValueChange && onValueChange(e.target?.value),
      300
    ),
    [onValueChange, debounce]
  );

  return (
    <div
      className={cn(
        "flex h-10 space-x-3 rounded-lg border border-border bg-primary p-[10px] transition-all focus-within:!border-primary-button focus-within:shadow-glow hover:border-secondary-foreground/40 md:h-12 md:p-3",
        className
      )}
    >
      <Search className="box-content h-5 w-5 text-secondary-foreground md:h-6 md:w-6" />
      <input
        {...props}
        className="hidden bg-transparent text-sm outline-none md:block"
        placeholder="Search Data"
        onChange={debounceChangeHandler}
      />
    </div>
  );
}

export { SearchInput };
