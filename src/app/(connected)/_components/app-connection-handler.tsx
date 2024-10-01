"use client"

import { redirect, usePathname, useSearchParams } from "next/navigation"

import { useVerida } from "@/features/verida"

export type AppConnectionHandlerProps = {
  children: React.ReactNode
}

export function AppConnectionHandler(props: AppConnectionHandlerProps) {
  const { children } = props

  const pathName = usePathname()
  const searchParams = useSearchParams()
  const { isConnected } = useVerida()

  if (!isConnected) {
    const fullPath = `${pathName}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    const encodedRedirectPath = encodeURIComponent(fullPath)
    // Ensure to use the same `redirectPath` query parameter as in `RootConnectionHandler`.
    redirect(`/?redirectPath=${encodedRedirectPath}`)
  }

  return <>{children}</>
}
AppConnectionHandler.displayName = "AppConnectionHandler"
