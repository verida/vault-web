"use client"

import { Suspense } from "react"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DataConnectionsBroadcastProvider } from "@/features/data-connections/components/data-connections-broadcast-provider"
import { QueriesProvider } from "@/features/queries/queries-provider"
import { RestrictedAccessProvider } from "@/features/restricted-access/components/restricted-access-provider"
import { ThemesProvider } from "@/features/themes/themes-provider"
import { VeridaProvider } from "@/features/verida/components/verida-provider"

export type RootProvidersProps = {
  children: React.ReactNode
}

export function RootProviders(props: RootProvidersProps) {
  const { children } = props

  // Put global providers not requiring the user to be connected or authorised to use the app.
  // For providers requiring the user to be connected and/or authorised to use the app, use the AppRestrictedProviders or AppUnrestrictedProviders components instead.
  return (
    <Suspense>
      <ThemesProvider>
        <TooltipProvider>
          <QueriesProvider>
            <VeridaProvider>
              <RestrictedAccessProvider>
                <DataConnectionsBroadcastProvider>
                  {children}
                </DataConnectionsBroadcastProvider>
              </RestrictedAccessProvider>
            </VeridaProvider>
          </QueriesProvider>
          <Toaster />
        </TooltipProvider>
      </ThemesProvider>
    </Suspense>
  )
}
