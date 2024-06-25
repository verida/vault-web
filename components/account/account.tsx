"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useVerida } from "@/features/verida";

import { ChevronDown } from "../icons/chevron-down";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function useAuth(): { authenticated: boolean } {
  return {
    authenticated: false,
  };
}

const Account = () => {
  const {
    connect,
    isConnecting,
    isConnected,
    did,
    disconnect,
    profile,
    isCheckingConnection,
    ...rest
  } = useVerida();
  if (!did && !profile && (isCheckingConnection || isConnecting)) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    );
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
        <div className="flex h-[56px] cursor-pointer items-center gap-3 rounded-lg border-gray-200 md:border md:px-3">
          <Avatar>
            <AvatarImage
              alt="Avatar"
              src={profile?.avatar?.uri ?? ""}
              width={40}
              height={40}
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <p className="hidden text-sm font-semibold text-gray-500 md:block">
            {profile?.name}
          </p>
          <ChevronDown className="hidden md:block" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel onClick={() => disconnect()}>
          Log out
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Account.displayName = "Account";

export { Account };
