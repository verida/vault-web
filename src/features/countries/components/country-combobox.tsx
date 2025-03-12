import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { type ComponentProps, forwardRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Typography } from "@/components/ui/typography"
import { getCountries } from "@/features/countries/utils"
import { cn } from "@/styles/utils"

const countries = getCountries()

export const CountryCombobox = Popover

export const CountryComboboxTrigger = PopoverTrigger

export interface CountryComboboxValueProps
  extends Omit<ComponentProps<typeof Button>, "children"> {
  selectedValue?: string
}

export const CountryComboboxValue = forwardRef<
  HTMLButtonElement,
  CountryComboboxValueProps
>((props, ref) => {
  const { selectedValue, className, ...buttonProps } = props

  return (
    <Button
      ref={ref}
      variant="outline"
      {...buttonProps}
      role="combobox"
      className={cn(
        "block w-full justify-start pl-3 text-left font-normal",
        className,
        selectedValue ? "text-foreground" : "text-muted-foreground"
      )}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        {selectedValue
          ? countries.find((country) => country.name === selectedValue)?.name
          : "Select country"}
        <ChevronsUpDownIcon className="size-5 shrink-0 opacity-50" />
      </div>
    </Button>
  )
})
CountryComboboxValue.displayName = "CountryComboboxValue"

export interface CountryComboboxContentProps
  extends Omit<ComponentProps<typeof PopoverContent>, "children"> {
  selectedValue?: string
  onSelectValue: (value: string) => void
}

export function CountryComboboxContent(props: CountryComboboxContentProps) {
  const { selectedValue, onSelectValue, className, ...contentProps } = props

  return (
    <PopoverContent
      align="start"
      collisionPadding={0}
      className={cn("max-h-52 w-screen max-w-[450px] p-0", className)}
      {...contentProps}
    >
      <Command className="max-h-52">
        <CommandInput
          placeholder="Search country"
          className="rounded-none border-0 border-b focus-visible:ring-0"
        />
        <CommandList className="w-full">
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {/* FIXME: Fix clearing the country */}
            {/* <CommandItem
              value=""
              onSelect={() => {
                onSelectValue("")
              }}
              className="px-2.5 py-1.5 text-muted-foreground"
            >
              <Typography component="span" className="truncate italic">
                No country
              </Typography>
            </CommandItem> */}
            {countries.map((country) => (
              <CommandItem
                value={country.name}
                key={country.code}
                onSelect={() => {
                  onSelectValue(country.name)
                }}
                className="px-2.5 py-1.5"
              >
                <div className="flex flex-row items-center justify-between gap-4">
                  <Typography component="span" className="truncate">
                    {country.name}
                  </Typography>
                  <CheckIcon
                    className={cn(
                      "size-5",
                      country.name === selectedValue
                        ? "opacity-50"
                        : "opacity-0"
                    )}
                  />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  )
}
