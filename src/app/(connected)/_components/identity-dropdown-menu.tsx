"use client"

import React from "react"

import { Copy } from "@/components/icons/copy"
import { Logout } from "@/components/icons/logout"
import { SimpleDown } from "@/components/icons/simple-down"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useVerida } from "@/features/verida"

export function IdentityDropdownMenu() {
  const { isConnecting, did, disconnect, profile } = useVerida()

  if (!did && !profile && isConnecting) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    )
  }

  const onCopyDid = () => {
    if (did) {
      window.navigator.clipboard.writeText(did)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto rounded-full border-0 p-0 md:rounded-lg md:border md:p-2 md:pl-3"
        >
          <div className="flex flex-row items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                alt="Avatar"
                src={profile?.avatar?.uri ?? ""}
                width={32}
                height={32}
              />
              <AvatarFallback>
                {profile?.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="hidden text-base font-semibold leading-5 text-muted-foreground md:inline-block">
              {profile?.name}
            </p>
            <SimpleDown className="hidden text-muted-foreground md:block" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 rounded-xl p-0" align="end">
        <DropdownMenuLabel className="px-4 py-3 font-normal">
          <div className="flex flex-row items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage
                alt="Avatar"
                src={profile?.avatar?.uri ?? ""}
                width={48}
                height={48}
              />
              <AvatarFallback>{profile?.name[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow space-y-0.5 overflow-hidden">
              <p className="text-[1rem] font-semibold text-muted-foreground">
                {profile?.name}
              </p>
              <Typography
                variant="base-s-regular"
                className="truncate text-muted-foreground"
              >
                {did}
              </Typography>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onCopyDid}
              className="shrink-0"
            >
              <Copy width="100%" height="100%" className="size-5" />
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem
          onClick={disconnect}
          className="cursor-pointer gap-3 px-4 py-4 text-destructive hover:!text-destructive"
        >
          <Logout />
          <Typography variant="base-semibold">Sign Out</Typography>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
