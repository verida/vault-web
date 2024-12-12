"use client"

import React from "react"
import { useDebouncedCallback } from "use-debounce"

import { SearchIcon } from "@/components/icons/search-icon"
import { cn } from "@/styles/utils"

export type SearchInputProps = {
  onValueChange?: React.Dispatch<string>
} & React.InputHTMLAttributes<HTMLInputElement>

// TODO: Rework the Input component with adornments
/**
 * @deprecated
 */
export function SearchInput(props: SearchInputProps) {
  const { onValueChange, className, ...inputProps } = props

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onValueChange?.(event.target?.value),
    300
  )

  return (
    <div
      className={cn(
        "flex h-10 space-x-3 rounded-lg border bg-surface p-[10px] transition-all focus-within:!border-primary hover:border-border-hover md:h-12 md:p-3",
        className
      )}
    >
      <SearchIcon className="box-content h-5 w-5 text-muted-foreground md:h-6 md:w-6" />
      <input
        {...inputProps}
        className="hidden bg-transparent text-sm outline-none md:block"
        placeholder="Search Data"
        onChange={handleChange}
      />
    </div>
  )
}
