"use client"

import { redirect, usePathname } from "next/navigation"

import { useAuth } from "@/features/auth"
import { useVerida } from "@/features/verida"

export type AppConnectionHandlerProps = {
  children: React.ReactNode
}

export function AppConnectionHandler(props: AppConnectionHandlerProps) {
  const { children } = props

  const pathName = usePathname()
  const { isConnected } = useVerida()
  const { setRedirectPath } = useAuth()

  if (!isConnected) {
    setRedirectPath(pathName)
    redirect("/")
  }

  return <>{children}</>
}
