import Image from "next/image"

import {
  AppHeaderNavBar,
  AppHeaderNavMenu,
} from "@/app/(connected)/_components/app-header-nav"
import { IdentityDropdownMenu } from "@/app/(connected)/_components/identity-dropdown-menu"
import { cn } from "@/styles/utils"

export type AppHeaderProps = Omit<React.ComponentProps<"header">, "children">

export function AppHeader(props: AppHeaderProps) {
  const { className, ...headerProps } = props

  return (
    <header
      {...headerProps}
      className={cn("z-10 h-[73px] border-b bg-surface shadow-sm", className)}
    >
      <div className="flex h-full flex-row justify-center">
        <div className="flex w-full max-w-screen-2xl flex-1 flex-row items-stretch justify-between gap-4">
          <div className="flex flex-row items-stretch gap-4 pl-4 md:pl-6 xl:pl-8">
            <div className="flex flex-row items-center lg:hidden">
              <AppHeaderNavMenu />
            </div>
            <div className="flex shrink-0 flex-row items-center">
              <Image
                src="/logo.svg"
                alt="Verida Vault Logo"
                height={32}
                width={95}
              />
            </div>
            <AppHeaderNavBar className="hidden lg:flex" />
          </div>
          <div className="flex flex-row items-center gap-4 py-4 pr-4 md:pr-6 xl:pr-8">
            <IdentityDropdownMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
