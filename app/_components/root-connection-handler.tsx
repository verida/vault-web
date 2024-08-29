"use client"

import { redirect } from "next/navigation"

import { ConnectionLoading } from "@/app/_components/connection-loading"
import { useAuth } from "@/features/auth"
import { getDefaultRedirectPathAfterConnection } from "@/features/routes/utils"
import { useVerida } from "@/features/verida"

const DEFAULT_REDIRECT_PATH = getDefaultRedirectPathAfterConnection()

export type RootConnectionHandlerProps = {
  children: React.ReactNode
}

export function RootConnectionHandler(props: RootConnectionHandlerProps) {
  const { children } = props

  const { isConnected, isConnecting } = useVerida()
  const { redirectPath } = useAuth()

  if (isConnected) {
    redirect(redirectPath !== "/" ? redirectPath : DEFAULT_REDIRECT_PATH)
  }

  if (isConnecting) {
    return <ConnectionLoading />
  }

  return <>{children}</>
}
