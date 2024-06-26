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
    <div className="flex h-12 flex-grow space-x-3 rounded-lg border border-gray-200 bg-white p-3 transition-all focus-within:!border-purple-500 focus-within:shadow-[0px_0px_4px_0px_rgba(83,84,209,0.60)] hover:border-gray-500/40">
      <Search className="box-content h-6 w-6 text-gray-500" />
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
