import Image from "next/image"
import { type ComponentProps } from "react"

import { HeaderCommandDialogButton } from "@/components/header/header-command-dialog-button"
import { HeaderInboxButton } from "@/components/header/header-inbox-button"
import { HeaderNavBar, HeaderNavMenu } from "@/components/header/header-nav"
import { Badge } from "@/components/ui/badge"
import { VeridaIdentityDropdownMenu } from "@/components/verida/verida-identity-dropdown-menu"
import { commonConfig } from "@/config/common"
import { cn } from "@/styles/utils"

export interface HeaderProps
  extends Omit<ComponentProps<"header">, "children"> {}

export function Header(props: HeaderProps) {
  const { className, ...headerProps } = props

  return (
    <header
      {...headerProps}
      className={cn("z-10 h-[73px] border-b bg-surface shadow-sm", className)}
    >
      <div className="flex h-full flex-row justify-center">
        <div className="flex w-full max-w-screen-2xl flex-1 flex-row items-stretch justify-between gap-4">
          <div className="flex flex-row items-stretch gap-4 pl-4 md:pl-6 xl:pl-8">
            <div className="flex flex-row items-center md:hidden">
              <HeaderNavMenu className="-mx-2" />
            </div>
            <div className="relative flex shrink-0 flex-row items-center">
              <Image
                src="/logo.svg"
                alt="Verida Vault Logo"
                height={32}
                width={95}
              />
              {commonConfig.IS_BETA ? (
                <Badge
                  variant="primary-inverse"
                  className="absolute -right-4 bottom-3 -rotate-12 px-1 py-0 font-normal"
                >
                  Beta
                </Badge>
              ) : null}
            </div>
            <HeaderNavBar className="hidden md:flex" />
          </div>
          <div className="flex flex-row items-center gap-4 py-4 pr-4 md:pr-6 xl:pr-8">
            <HeaderCommandDialogButton className="h-8 w-8 md:h-12 md:w-auto" />
            <HeaderInboxButton className="h-8 w-8 md:h-12 md:w-auto" />
            <VeridaIdentityDropdownMenu displayNotConnectedSkeleton />
          </div>
        </div>
      </div>
    </header>
  )
}
Header.displayName = "Header"
