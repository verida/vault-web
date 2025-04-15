"use client"

import { redirect, usePathname, useSearchParams } from "next/navigation"
import { type ReactNode } from "react"

import { useRedirectPathQueryState } from "@/features/auth/hooks/use-redirect-path-query-state"
import { getRootPageRoute } from "@/features/routes/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export interface AppConnectionHandlerProps {
  children: ReactNode
}

export function AppConnectionHandler(props: AppConnectionHandlerProps) {
  const { children } = props

  const pathName = usePathname()
  const searchParams = useSearchParams()

  const { serializeRedirectPath } = useRedirectPathQueryState()

  const { status } = useVerida()

  if (status !== "connected") {
    redirect(
      serializeRedirectPath(getRootPageRoute(), {
        redirectPath: `${pathName}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
      })
    )
  }

  return <>{children}</>
}
AppConnectionHandler.displayName = "AppConnectionHandler"
