import React, { useCallback } from "react";
import { Search } from "./icons/search";
import { debounce } from "lodash";

type SearchInputProps = {
  onValueChange?: React.Dispatch<string>;
} & React.InputHTMLAttributes<HTMLInputElement>;

function SearchInput({ onValueChange, ...props }: SearchInputProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceChangeHandler = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => onValueChange && onValueChange(e.target?.value), 300),
    [onValueChange, debounce]
  );

  return (
    <div className='p-3 h-12 bg-white rounded-lg border border-border flex flex-grow space-x-3'>
      <Search className='box-content w-6 h-6 text-gray-500' />
      <input
        {...props}
        className='text-sm outline-none bg-transparent'
        placeholder='Search Data'
        onChange={debounceChangeHandler}
      />
    </div>
  );
}

export { SearchInput };
