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

  const onCopyDid = () => {
    if (did) {
      window.navigator.clipboard.writeText(did);
    }
  };

  return !isConnected ? (
    <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
      <Button size="sm" variant="secondary" onClick={() => connect()}>
        Login
      </Button>
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} className="h-auto gap-2 rounded-lg px-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              alt="Avatar"
              src={profile?.avatar?.uri ?? ""}
              width={32}
              height={32}
            />
            <AvatarFallback>{profile?.name[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="hidden text-[1rem] font-semibold text-secondary-foreground md:block">
            {profile?.name}
          </p>
          <SimpleDown className="hidden text-secondary-foreground md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 rounded-xl p-0" align="end">
        <DropdownMenuItem className="gap-3 px-4 py-3" onClick={onCopyDid}>
          <Avatar>
            <AvatarImage
              alt="Avatar"
              src={profile?.avatar?.uri ?? ""}
              width={48}
              height={48}
            />
            <AvatarFallback>{profile?.name[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow space-y-0.5 overflow-hidden">
            <p className="text-[1rem] font-semibold text-secondary-foreground">
              {profile?.name}
            </p>
            <Typography
              variant="base-s-regular"
              className="truncate text-secondary-foreground"
            >
              {did}
            </Typography>
          </div>
          <Copy className="flex-shrink-0 cursor-pointer" />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="cursor-pointer gap-3 px-4 py-4 text-destructive hover:!text-destructive"
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
