"use client"

import { CommandProvider } from "@/features/command/command-provider"
import { InboxProvider } from "@/features/inbox/inbox-context"
import { VeridaInboxProvider } from "@/features/verida-inbox/components/verida-inbox-provider"

export type AppUnrestrictedProvidersProps = {
  children: React.ReactNode
}

export function AppUnrestrictedProviders(props: AppUnrestrictedProvidersProps) {
  const { children } = props

  // Put providers only required for when the user is connected and the context is needed in the Header and Footer.

  // For all the other providers, prefer using AppRestrictedProviders instead.

  // For global providers required in any cases, use the RootProviders component.
  return (
    <VeridaInboxProvider>
      <InboxProvider>
        <CommandProvider>{children}</CommandProvider>
      </InboxProvider>
    </VeridaInboxProvider>
  )
}
