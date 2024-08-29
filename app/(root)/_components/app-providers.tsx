"use client"

import { InboxProvider } from "@/features/inbox/contexts/InboxContext"

export type AppProvidersProps = {
  children: React.ReactNode
}

export function AppProviders(props: AppProvidersProps) {
  const { children } = props

  // Put the providers requiring the user to be connected and unnecessary when the user is not connected.
  // For global providers required in both cases, use the RootProviders component.
  return <InboxProvider>{children}</InboxProvider>
}
