"use client"

import { AssistantsProvider } from "@/features/assistants/components/assistants-provider"
import { DataConnectionsProvider } from "@/features/data-connections/components/data-connections-provider"

export type AppRestrictedProvidersProps = {
  children: React.ReactNode
}

export function AppRestrictedProviders(props: AppRestrictedProvidersProps) {
  const { children } = props

  // Put the providers requiring the user to be connected and authorised to use the app. This should be most providers with any feature-related logic

  // For global providers required in any cases, use the RootProviders component.
  return (
    <DataConnectionsProvider>
      <AssistantsProvider>{children}</AssistantsProvider>
    </DataConnectionsProvider>
  )
}
