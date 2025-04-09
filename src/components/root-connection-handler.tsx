"use client"

import { redirect } from "next/navigation"
import type { ReactNode } from "react"

import { VeridaAccountChecking } from "@/components/verida/verida-account-checking"
import { VeridaConnectionLoading } from "@/components/verida/verida-connection-loading"
import { useRedirectPathQueryState } from "@/features/auth/hooks/use-redirect-path-query-state"
import { getDefaultRedirectPathAfterConnection } from "@/features/routes/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { useVeridaAccountExists } from "@/features/verida/hooks/use-verida-account-exists"

const DEFAULT_REDIRECT_PATH = getDefaultRedirectPathAfterConnection()

export interface RootConnectionHandlerProps {
  children: ReactNode
}

export function RootConnectionHandler(props: RootConnectionHandlerProps) {
  const { children } = props

  const { isConnected, isConnecting, did } = useVerida()
  const { isLoading: isCheckingAccount } = useVeridaAccountExists(did)

  const { redirectPath } = useRedirectPathQueryState()

  if (isConnected) {
    redirect(redirectPath || DEFAULT_REDIRECT_PATH)
  }

  if (isConnecting) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
        <VeridaConnectionLoading />
      </div>
    )
  }

  if (isCheckingAccount) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
        <VeridaAccountChecking />
      </div>
    )
  }

  return <>{children}</>
}
RootConnectionHandler.displayName = "RootConnectionHandler"
