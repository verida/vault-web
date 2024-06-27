import { debounce } from "lodash";
import React, { useCallback } from "react";

import { Search } from "./icons/search";

type SearchInputProps = {
  onValueChange?: React.Dispatch<string>;
} & React.InputHTMLAttributes<HTMLInputElement>;

function SearchInput({ onValueChange, ...props }: SearchInputProps) {
  const debounceChangeHandler = useCallback(
    debounce(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        onValueChange && onValueChange(e.target?.value),
      300
    ),
    [onValueChange, debounce]
  );

  return (
    <div className="flex h-12 flex-grow space-x-3 rounded-lg border border-border bg-background p-3 transition-all focus-within:!border-purple-500 focus-within:shadow-glow hover:border-secondary-foreground/40">
      <Search className="box-content h-6 w-6 text-secondary-foreground" />
      <input
        {...props}
        className="bg-transparent text-sm outline-none"
        placeholder="Search Data"
        onChange={debounceChangeHandler}
      />
    </div>
  );
}

export { SearchInput };
