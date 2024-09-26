"use client"

import { InboxProvider } from "@/features/inbox/contexts/InboxContext"

export type AppUnrestrictedProvidersProps = {
  children: React.ReactNode
}

export function AppUnrestrictedProviders(props: AppUnrestrictedProvidersProps) {
  const { children } = props

  // Put providers only required for when the user is connected and the context is needed in the Header and Footer.

  // For all the other providers, prefer using AppRestrictedProviders instead.

  // For global providers required in any cases, use the RootProviders component.
  return <InboxProvider>{children}</InboxProvider>
}
