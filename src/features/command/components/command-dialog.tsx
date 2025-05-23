"use client"

import { useRouter } from "next/navigation"
import { type ComponentProps, useCallback, useMemo, useState } from "react"
import { useDebounce } from "use-debounce"

import { Close as CloseIcon } from "@/components/icons/close"
import { Data } from "@/components/icons/data"
import { DatabaseIcon } from "@/components/icons/database-icon"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Typography } from "@/components/ui/typography"
import { useCommand } from "@/features/command/hooks/use-command"
import { DEFAULT_SELECTED_SEARCH_TYPES } from "@/features/data-search/constants"
import { useSearchData } from "@/features/data-search/hooks/use-search-data"
import type { SearchDataResult, SearchType } from "@/features/data-search/types"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { getDatabaseItemPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export function CommandDialog() {
  const router = useRouter()
  const { isOpen, changeCommandState } = useCommand()

  const [searchTypes, setSearchTypes] = useState<SearchType[]>(
    DEFAULT_SELECTED_SEARCH_TYPES
  )

  const hasCustomSearchTypes = useMemo(() => {
    return (
      !DEFAULT_SELECTED_SEARCH_TYPES.every((type) =>
        searchTypes.includes(type)
      ) || searchTypes.length !== DEFAULT_SELECTED_SEARCH_TYPES.length
    )
  }, [searchTypes])

  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 500)

  const { items, isLoading, isError } = useSearchData(
    debouncedSearch,
    searchTypes
  )

  const handleSelectSearchType = useCallback(
    (searchType: SearchType, isSelected: boolean) => {
      if (isSelected) {
        setSearchTypes((prev) => [...prev, searchType])
      } else {
        setSearchTypes((prev) => prev.filter((type) => type !== searchType))
      }
    },
    []
  )

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
      <DialogContent className="inset-0 max-h-none overflow-hidden rounded-none border-0 p-0 duration-500 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-bottom-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-bottom-0 data-[state=open]:slide-in-from-right sm:right-auto sm:top-auto sm:h-[90vh] sm:max-h-96 sm:max-w-2xl sm:border sm:p-0">
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
            <div
              className="flex flex-1 flex-row-reverse items-center gap-2"
              // HACK: Using flow reverse to put the input first in the DOM flow
              // Apparently what's used to give the input the focus
            >
              <CommandInput
                placeholder="Search your data..."
                value={search}
                onValueChange={setSearch}
                displayClearButton={search.length > 0}
                onClear={handleClearSearch}
              />
              <SearchCommandSearchTypeMenu
                selectedSearchTypes={searchTypes}
                onSelectSearchType={handleSelectSearchType}
                showIndicator={hasCustomSearchTypes}
                className="shrink-0"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleClose}
              className="h-12 w-12 sm:hidden"
            >
              <CloseIcon className="size-6 shrink-0" />
              <span className="sr-only">Close</span>
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
CommandDialog.displayName = "AppCommandDialog"

interface SearchCommandItemProps {
  item: SearchDataResult
  onSelect: (item: SearchDataResult) => void
}

function SearchCommandItem(props: SearchCommandItemProps) {
  const { item, onSelect } = props

  const handleSelect = useCallback(() => {
    onSelect(item)
  }, [item, onSelect])

  const database = useMemo(() => {
    return USER_DATABASE_DEFS.find((db) => item.databaseId === db.id)
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

interface SearchCommandSearchTypeMenuProps
  extends Pick<ComponentProps<typeof Button>, "className"> {
  selectedSearchTypes: SearchType[]
  onSelectSearchType: (searchType: SearchType, isSelected: boolean) => void
  showIndicator?: boolean
}

function SearchCommandSearchTypeMenu(props: SearchCommandSearchTypeMenuProps) {
  const { className, selectedSearchTypes, onSelectSearchType, showIndicator } =
    props

  type SearchTypeDef = {
    value: SearchType
    label: string
    color: string
  }

  const availableSearchTypes: SearchTypeDef[] = USER_DATABASE_DEFS.filter(
    (db) => !!db.searchType
  ).map((db) => ({
    value: db.searchType as SearchType, // Ok to assert as we filter above
    label: db.titlePlural,
    color: db.color,
  }))

  return (
    <DropdownMenu
    // FIXME: Because of an internal conflict in radix-ui, we had to fix the
    // version of @radix-ui/react-dialog and @radix-ui/dismissable-layer to
    // 1.0.5.
    // The issue was when pressing ESC on the dropdown menu, it would close
    // the dialog as well. Even worse, the focus would be trapped in the
    // no longer displayed dialog modal, making the whole UI unresponsive to
    // clicks.
    // The downside of this hack is that, for some reasons, the menu is no
    // longer navigable by the keyboard direction keys, which is not ideal from
    // an accessibility standpoint but better than the loss of click
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("relative flex h-12 w-12 flex-row gap-1", className)}
        >
          <Data className="size-5 shrink-0" />
          <span className="sr-only">Select data type</span>
          {showIndicator && (
            <div className="absolute right-0 top-0 size-3 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          // TODO: Find a way to use a DropdownMenuCheckboxItem to improve accessibility
          // Right now, the user action is on the menu item itself,
          // which is good, and the Checkbox is for visual only but
          // is picked up by the screen readers as an actual control
          // which doesn't have any action associated with it
          key="all-types"
          onSelect={(event) => {
            event.preventDefault()
            availableSearchTypes.forEach((type) => {
              onSelectSearchType(
                type.value,
                !availableSearchTypes.every((type) =>
                  selectedSearchTypes.includes(type.value)
                )
              )
            })
          }}
          className="gap-2 px-3 py-2.5"
        >
          <Checkbox
            checked={availableSearchTypes.every((type) =>
              selectedSearchTypes.includes(type.value)
            )}
            aria-labelledby="search-type-all"
          />
          <span id="search-type-all">All</span>
        </DropdownMenuItem>
        {availableSearchTypes.map((type) => (
          <DropdownMenuItem
            // TODO: Find a way to use a DropdownMenuCheckboxItem to improve accessibility
            // Right now, the user action is on the menu item itself,
            // which is good, and the Checkbox is for visual only but
            // is picked up by the screen readers as an actual control
            // which doesn't have any action associated with it
            key={type.value}
            onSelect={(event) => {
              event.preventDefault()
              onSelectSearchType(
                type.value,
                !selectedSearchTypes.includes(type.value)
              )
            }}
            className="gap-2 px-3 py-2.5"
          >
            <Checkbox
              checked={selectedSearchTypes.includes(type.value)}
              aria-labelledby={`search-type-${type.value}`}
            />
            <span
              id={`search-type-${type.value}`}
              className="flex flex-row items-center gap-2"
            >
              <DatabaseIcon fill={type.color} className="size-5 shrink-0" />
              {type.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
SearchCommandSearchTypeMenu.displayName = "SearchCommandSearchTypeMenu"
