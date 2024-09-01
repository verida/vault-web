"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import {
  AppHeaderNavBar,
  AppHeaderNavMenu,
} from "@/app/(connected)/_components/app-header-nav"
import { IdentityDropdownMenu } from "@/app/(connected)/_components/identity-dropdown-menu"
import { Close } from "@/components/icons/close"
import { Hamburger } from "@/components/icons/hamburger"
import { cn } from "@/styles/utils"

export type AppHeaderProps = Omit<React.ComponentProps<"header">, "children">

export function AppHeader(props: AppHeaderProps) {
  const { className, ...headerProps } = props

  const [isMenuOpened, setIsMenuOpened] = useState(false)

  return (
    <header {...headerProps} className={cn("border-b bg-surface", className)}>
      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-screen-2xl flex-1 flex-row items-stretch justify-between gap-4">
          <div className="flex flex-row items-stretch gap-4 pl-4 md:pl-6 xl:pl-8">
            <div className="flex flex-row items-center lg:hidden">
              <div
                className="relative flex h-6 w-6 cursor-pointer flex-row items-center transition-all hover:opacity-70"
                onClick={() => setIsMenuOpened((prev) => !prev)}
              >
                {!isMenuOpened ? <Hamburger /> : <Close />}
              </div>
            </div>
            {isMenuOpened && (
              <AppHeaderNavMenu onNavItemClick={() => setIsMenuOpened(false)} />
            )}
            <Link href="/" className="flex shrink-0 flex-row items-center">
              <Image
                src="/logo.svg"
                alt="Verida Vault Logo"
                height={32}
                width={95}
              />
            </Link>
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
