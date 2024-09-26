"use client"

import { RestrictedAccessPageContent } from "@/app/(connected)/_components/restricted-access-page-content"
import { useRestrictedAccess } from "@/features/restricted-access/hooks/use-restricted-access"
import { useVerida } from "@/features/verida"

export type RestrictedAccessHandlerProps = {
  children: React.ReactNode
}

export function RestrictedAccessHandler(props: RestrictedAccessHandlerProps) {
  const { children } = props

  const { isConnected } = useVerida()
  const { access, isLoading } = useRestrictedAccess()

  if (access === "allowed" || !isConnected) {
    return <>{children}</>
  }

  return <RestrictedAccessPageContent isLoading={isLoading} />
}
RestrictedAccessHandler.displayName = "RestrictedAccessHandler"
