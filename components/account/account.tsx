"use client"

import React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useVerida } from "@/features/verida"

import { Copy } from "../icons/copy"
import { Logout } from "../icons/logout"
import { SimpleDown } from "../icons/simple-down"
import { Typography } from "../typography"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

const Account = () => {
  const {
    connect,
    isConnecting,
    isConnected,
    did,
    disconnect,
    profile,
    isCheckingConnection,
  } = useVerida()

  if (!did && !profile && (isCheckingConnection || isConnecting)) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    )
  }

  return !isConnected ? (
    <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
      <Button size="sm" variant="secondary" onClick={() => connect()}>
        Login
      </Button>
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex h-[56px] cursor-pointer items-center gap-3 rounded-lg border-border md:border md:px-3">
          <Avatar>
            <AvatarImage
              alt="Avatar"
              src={profile?.avatar?.uri ?? ""}
              width={40}
              height={40}
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Typography
            variant="heading-5"
            className="hidden text-secondary-foreground md:block"
          >
            {profile?.name}
          </Typography>
          <SimpleDown className="hidden text-secondary-foreground md:block" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuItem className="gap-3 px-4 py-3">
          <Avatar>
            <AvatarImage
              alt="Avatar"
              src={profile?.avatar?.uri ?? ""}
              width={40}
              height={40}
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex-grow overflow-hidden">
            <Typography
              variant="heading-5"
              className="hidden text-secondary-foreground md:block"
            >
              {profile?.name}
            </Typography>
            <Typography
              variant="base-s-regular"
              className="truncate text-secondary-foreground"
            >
              {did}
            </Typography>
          </div>
          <Copy className="flex-shrink-0 cursor-pointer" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="cursor-pointer gap-3 px-4 py-2 text-destructive hover:!text-destructive"
        >
          <Logout />
          <Typography variant="base-semibold">Sign Out</Typography>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Account.displayName = "Account"

export { Account }
