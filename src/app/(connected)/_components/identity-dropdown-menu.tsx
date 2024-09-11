"use client"

import React, { useCallback } from "react"

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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { EMPTY_PROFILE_NAME_FALLBACK } from "@/features/profiles/constants"
import { useToast } from "@/features/toasts"
import { useVerida } from "@/features/verida"
import { cn } from "@/styles/utils"

export type IdentityDropdownMenuProps = Pick<
  React.ComponentProps<typeof Button>,
  "className"
>

export function IdentityDropdownMenu(props: IdentityDropdownMenuProps) {
  const { className } = props

  const { isConnected, did, profile, disconnect } = useVerida()

  const { toast } = useToast()

  const handleCopyDid = useCallback(async () => {
    if (did) {
      await window.navigator.clipboard.writeText(did)
      toast({
        variant: "success",
        description: "DID copied to clipboard",
      })
    }
  }, [did, toast])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-auto max-w-56 rounded-full border-0 p-0 md:rounded-lg md:border md:py-2 md:pl-3 md:pr-2",
            className
          )}
        >
          <div className="flex w-full flex-row items-center gap-2">
            {profile ? (
              <>
                <Avatar className="size-8">
                  <AvatarImage alt="User Avatar" src={profile.avatar?.uri} />
                  <AvatarFallback>
                    {profile.name?.at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p
                  className={cn(
                    "hidden flex-1 truncate text-base font-semibold leading-5 text-muted-foreground md:block",
                    profile.name ? "" : "italic"
                  )}
                >
                  {profile.name || EMPTY_PROFILE_NAME_FALLBACK}
                </p>
              </>
            ) : (
              <>
                <Skeleton className="size-8 shrink-0 rounded-full border" />
                <Skeleton className="my-0.5 hidden h-4 w-24 md:block" />
              </>
            )}
            <SimpleDown className="hidden shrink-0 text-muted-foreground md:block" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-screen max-w-80 rounded-xl p-0"
        align="end"
      >
        <DropdownMenuItem className="block px-4 py-3" onClick={handleCopyDid}>
          <div className="flex flex-row items-center gap-3">
            {profile ? (
              <Avatar className="size-12">
                <AvatarImage alt="User Avatar" src={profile.avatar?.uri} />
                <AvatarFallback>
                  {profile.name.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="size-12 shrink-0 rounded-full border" />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              {profile ? (
                <p
                  className={cn(
                    "truncate text-base font-semibold leading-snug text-muted-foreground",
                    profile.name ? "" : "italic"
                  )}
                >
                  {profile.name || EMPTY_PROFILE_NAME_FALLBACK}
                </p>
              ) : (
                <Skeleton className="h-4 w-full" />
              )}
              {did ? (
                <div className="text-muted-foreground">
                  <Typography
                    variant="base-s-regular"
                    className="truncate leading-normal"
                  >
                    {did}
                  </Typography>
                </div>
              ) : (
                <Skeleton className="my-0.5 h-3 w-12" />
              )}
            </div>
            {did ? (
              <div className="-mx-2 flex cursor-pointer flex-row items-center justify-center rounded-md p-2">
                <Copy width="100%" height="100%" className="size-5" />
                <span className="sr-only">Click to copy DID</span>
              </div>
            ) : null}
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem
          onClick={disconnect}
          disabled={!isConnected}
          className="cursor-pointer gap-3 px-4 py-4 text-destructive"
        >
          <Logout />
          <Typography variant="base-semibold">Disconnect</Typography>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
IdentityDropdownMenu.displayName = "IdentityDropdownMenu"
