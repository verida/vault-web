import React from "react"

import { Search } from "@/components/icons/search"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const SearchBox = (props: InputProps) => {
  return (
    <>
      <div className="relative hidden min-w-[200px] md:block lg:min-w-[380px]">
        <Input
          placeholder="Search Data"
          className="h-12 w-full pl-12 text-base-regular"
          {...props}
        />

        <Search className="absolute left-3 top-3 [&_*]:stroke-secondary-foreground" />
      </div>
      <div className="block md:hidden">
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant={"secondary"} size={"icon"}>
              <Search className="[&_*]:stroke-secondary-foreground" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="relative w-full">
                <Input
                  placeholder="Search Data"
                  className="h-12 w-full pl-12 text-base-regular"
                  {...props}
                />

                <Search className="absolute left-3 top-3 [&_*]:stroke-secondary-foreground" />
              </div>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export default SearchBox
