"use client"

import { redirect } from "next/navigation"
import { ReactNode } from "react"

import { ConnectionLoading } from "@/app/_components/connection-loading"
import { useRedirectPathQueryState } from "@/features/auth/hooks/use-redirect-path-query-state"
import { getDefaultRedirectPathAfterConnection } from "@/features/routes/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

const DEFAULT_REDIRECT_PATH = getDefaultRedirectPathAfterConnection()

export interface RootConnectionHandlerProps {
  children: ReactNode
}

export function RootConnectionHandler(props: RootConnectionHandlerProps) {
  const { children } = props

  const { isConnected, isConnecting } = useVerida()

  const { redirectPath } = useRedirectPathQueryState()

  if (isConnected) {
    redirect(redirectPath || DEFAULT_REDIRECT_PATH)
  }

  if (isConnecting) {
    return <ConnectionLoading />
  }

  return <>{children}</>
}
RootConnectionHandler.displayName = "RootConnectionHandler"
