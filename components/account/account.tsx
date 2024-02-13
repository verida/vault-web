import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useVerida } from '@/features/verida'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {}

function useAuth(): { authenticated: boolean } {
  return {
    authenticated: false
  }
}


const Account = (props: Props) => {
  const { connect, isConnecting, isCheckingConnection, isConnected, did, disconnect, isReady, profile } = useVerida();
  console.log('profile', profile)
  if (isConnecting) return <div className="flex items-center space-x-4">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
    </div>
  </div>
  return !isConnected ?
    <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
      <Button size="sm" variant="outline" onClick={() => connect()}>
        Login
      </Button>
    </div>
    : <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center gap-2 h-[56px]'>
            <Avatar>
              <AvatarImage alt='Avatar' src={profile?.avatarUri ?? ''} width={40} height={40} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <p className='text-sm'>{profile?.name}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel onClick={() => disconnect()}>Log out</DropdownMenuLabel>
        </DropdownMenuContent>
    </DropdownMenu>

}

Account.displayName = "Account"

export { Account }
