"use client"

import { redirect, usePathname } from "next/navigation"

import { useVerida } from "@/features/verida"

export type AppConnectionHandlerProps = {
  children: React.ReactNode
}

export function AppConnectionHandler(props: AppConnectionHandlerProps) {
  const { children } = props

  const pathName = usePathname()
  const { isConnected } = useVerida()

  if (!isConnected) {
    const encodedRedirectPath = encodeURIComponent(pathName)
    // Ensure to use the same `redirectPath` query parameter as in `RootConnectionHandler`.
    redirect(`/?redirectPath=${encodedRedirectPath}`)
  }

  return <>{children}</>
}
