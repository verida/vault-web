import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {}


function useAuth(): { authenticated: boolean } {
  return {
    authenticated: true
  }
}


const Account = (props: Props) => {
  const { authenticated } = useAuth()
  return authenticated ? <div> Account</div > :
    <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
      <Button size="sm" variant="outline" asChild>
        <Link href="/sign-in">
          Login
        </Link>
      </Button>
    </div>
}

Account.displayName = "Account"

export { Account }
