"use client"

import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { useDebounce } from "use-debounce"

import { DatabaseIcon } from "@/components/icons/database-icon"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCommand } from "@/features/command/use-command"
import { SearchDataResult } from "@/features/data-search/types"
import { useSearchData } from "@/features/data-search/use-search-data"
import { DATABASE_DEFS } from "@/features/data/constants"
import { getDatabaseItemPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export function AppCommandDialog() {
  const { isOpen, changeCommandState } = useCommand()
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 500)

  const { items, isLoading, isError } = useSearchData(debouncedSearch)

  const handleClearSearch = useCallback(() => {
    setSearch("")
  }, [setSearch])

  const handleChangeDialogState = useCallback(
    (isOpen: boolean) => {
      changeCommandState(isOpen)
      if (!isOpen) {
        setSearch("")
      }
    },
    [changeCommandState, setSearch]
  )

  const handleClose = useCallback(() => {
    handleChangeDialogState(false)
  }, [handleChangeDialogState])

  const handleSelectItem = useCallback(
    (item: SearchDataResult) => {
      router.push(
        getDatabaseItemPageRoute({
          databaseId: item.databaseId,
          itemId: item.id,
        })
      )
      handleClose()
    },
    [router, handleClose]
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeDialogState}>
      <DialogContent className="h-dvh max-h-none overflow-hidden rounded-none p-0 sm:max-h-96 sm:max-w-2xl sm:p-0">
        <Command
          shouldFilter={false}
          loop
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
        >
          <DialogTitle className="hidden">Search</DialogTitle>
          <DialogDescription className="hidden">
            Search your data
          </DialogDescription>
          <div className="flex flex-row items-center gap-2 p-4 pb-0.5">
            <CommandInput
              placeholder="Search your data..."
              value={search}
              onValueChange={setSearch}
              displayClearButton={search.length > 0}
              onClear={handleClearSearch}
            />
            <Button
              variant="outline"
              onClick={handleClose}
              className="sm:hidden"
            >
              Cancel
            </Button>
          </div>
          <CommandList className="pt-3.5 [&_[cmdk-list-sizer]]:px-4 [&_[cmdk-list-sizer]]:pb-4">
            {items && items.length > 0 ? (
              <>
                {items.map((item) => (
                  <SearchCommandItem
                    key={item.id}
                    item={item}
                    onSelect={handleSelectItem}
                  />
                ))}
              </>
            ) : isLoading ? (
              <CommandLoading>Searching...</CommandLoading>
            ) : items && items.length === 0 ? (
              <CommandEmpty>No results found</CommandEmpty>
            ) : isError ? (
              <CommandEmpty>Error searching for data</CommandEmpty>
            ) : (
              <CommandEmpty>Start typing to search</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
AppCommandDialog.displayName = "AppCommandDialog"

type SearchCommandItemProps = {
  item: SearchDataResult
  onSelect: (item: SearchDataResult) => void
}

function SearchCommandItem(props: SearchCommandItemProps) {
  const { item, onSelect } = props

  const handleSelect = useCallback(() => {
    onSelect(item)
  }, [item, onSelect])

  const database = useMemo(() => {
    return DATABASE_DEFS.find((db) => item.databaseId === db.id)
  }, [item.databaseId])

  return (
    <CommandItem
      value={item.id}
      onSelect={handleSelect}
      className="flex flex-row items-center gap-3 px-2 py-3"
    >
      <DatabaseIcon fill={database?.color} className="shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Typography variant="base-semibold" className="truncate">
          {item.name}
        </Typography>
        <div className="text-muted-foreground">
          <Typography variant="base-s-regular" className="truncate">
            {database?.title}
          </Typography>
        </div>
      </div>
    </CommandItem>
  )
}
SearchCommandItem.displayName = "SearchCommandItem"

export type AppCommandDialogTriggerProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "onClick"
>

export function AppCommandDialogTrigger(props: AppCommandDialogTriggerProps) {
  const { variant = "ghost", size = "sm", className, ...buttonProps } = props

  const { openCommand } = useCommand()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("gap-1", className)}
          onClick={openCommand}
          {...buttonProps}
        >
          <SearchIcon className="h-4 w-4 shrink-0 opacity-50" />
          <span className="sr-only">Search</span>
          <span className="hidden rounded-sm bg-background p-1 text-base-s-regular text-muted-foreground sm:inline-block">
            ⌘K
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Search</TooltipContent>
    </Tooltip>
  )
}
AppCommandDialogTrigger.displayName = "AppCommandDialogTrigger"
