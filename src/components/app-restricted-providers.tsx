import { ReactNode } from "react"

import { ConditionalWrappingComponent } from "@/components/conditional-wrapping-component"
import { featureFlags } from "@/config/features"
import { AssistantsProvider } from "@/features/assistants/components/assistants-provider"
import { DataConnectionsProvider } from "@/features/data-connections/components/data-connections-provider"

export interface AppRestrictedProvidersProps {
  children: ReactNode
}

export function AppRestrictedProviders(props: AppRestrictedProvidersProps) {
  const { children } = props

  return (
    <DataConnectionsProvider>
      <ConditionalWrappingComponent
        condition={featureFlags.assistant.enabled}
        Component={AssistantsProvider}
      >
        {children}
      </ConditionalWrappingComponent>
    </DataConnectionsProvider>
  )
}
AppRestrictedProviders.displayName = "AppRestrictedProviders"
