"use client"

import type { ReactNode } from "react"

import { RestrictedAccessPageContent } from "@/features/restricted-access/components/restricted-access-page-content"
import { useRestrictedAccess } from "@/features/restricted-access/hooks/use-restricted-access"
import { useVerida } from "@/features/verida/hooks/use-verida"

export interface RestrictedAccessHandlerProps {
  children: ReactNode
}

export function RestrictedAccessHandler(props: RestrictedAccessHandlerProps) {
  const { children } = props

  const { status } = useVerida()
  const { access, isLoading, isError } = useRestrictedAccess()

  if (access === "allowed" || status !== "connected") {
    return <>{children}</>
  }

  return <RestrictedAccessPageContent isLoading={isLoading} isError={isError} />
}
RestrictedAccessHandler.displayName = "RestrictedAccessHandler"
