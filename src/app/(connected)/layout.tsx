import { ReactNode } from "react"

import { AppConnectionHandler } from "@/components/app-connection-handler"
import { AppRestrictedProviders } from "@/components/app-restricted-providers"
import { RestrictedAccessHandler } from "@/features/restricted-access/components/restricted-access-handler"

export interface ConnectedLayoutProps {
  children: ReactNode
}

export default function ConnectedLayout(props: ConnectedLayoutProps) {
  const { children } = props

  return (
    <AppConnectionHandler>
      <RestrictedAccessHandler>
        <AppRestrictedProviders>{children}</AppRestrictedProviders>
      </RestrictedAccessHandler>
    </AppConnectionHandler>
  )
}
ConnectedLayout.displayName = "ConnectedLayout"
