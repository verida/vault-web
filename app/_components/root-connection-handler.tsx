"use client"

import { redirect, useSearchParams } from "next/navigation"

import { ConnectionLoading } from "@/app/_components/connection-loading"
import { getDefaultRedirectPathAfterConnection } from "@/features/routes/utils"
import { useVerida } from "@/features/verida"

const DEFAULT_REDIRECT_PATH = getDefaultRedirectPathAfterConnection()

export type RootConnectionHandlerProps = {
  children: React.ReactNode
}

export function RootConnectionHandler(props: RootConnectionHandlerProps) {
  const { children } = props

  const { isConnected, isConnecting } = useVerida()

  const searchParams = useSearchParams()
  // Ensure to use the same `redirectPath` query parameter as in `AppConnectionHandler`.
  const redirectPath = searchParams.get("redirectPath") || DEFAULT_REDIRECT_PATH

  if (isConnected) {
    redirect(decodeURIComponent(redirectPath))
  }

  if (isConnecting) {
    return <ConnectionLoading />
  }

  return <>{children}</>
}
